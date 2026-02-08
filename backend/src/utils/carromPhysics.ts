// Simplified 2D carrom physics engine
// Board is 700x700 units. Pockets at 4 corners.

export const BOARD_SIZE = 700;
export const POCKET_RADIUS = 28;
export const COIN_RADIUS = 13;
export const STRIKER_RADIUS = 17;
export const FRICTION = 0.97;
export const MIN_VELOCITY = 0.3;
export const MAX_STEPS = 500;
export const RESTITUTION = 0.85; // bounce energy retention

export interface Piece {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'white' | 'black' | 'queen' | 'striker';
  pocketed: boolean;
}

export interface StrikeResult {
  pieces: Piece[];
  pocketed: Piece[];
  strikerPocketed: boolean;
  foul: boolean;
}

const POCKETS = [
  { x: 35, y: 35 },
  { x: BOARD_SIZE - 35, y: 35 },
  { x: 35, y: BOARD_SIZE - 35 },
  { x: BOARD_SIZE - 35, y: BOARD_SIZE - 35 },
];

export function createInitialBoard(): Piece[] {
  const pieces: Piece[] = [];
  const center = BOARD_SIZE / 2;

  // Queen at center
  pieces.push({
    id: 'queen',
    x: center,
    y: center,
    vx: 0,
    vy: 0,
    radius: COIN_RADIUS,
    type: 'queen',
    pocketed: false,
  });

  // Inner ring: 6 coins at radius 30 from center, alternating white/black
  const innerRadius = 30;
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60) * Math.PI / 180;
    const type = i % 2 === 0 ? 'white' : 'black';
    pieces.push({
      id: `${type}_${Math.floor(i / 2)}_inner`,
      x: center + innerRadius * Math.cos(angle),
      y: center + innerRadius * Math.sin(angle),
      vx: 0,
      vy: 0,
      radius: COIN_RADIUS,
      type,
      pocketed: false,
    });
  }

  // Outer ring: 12 coins at radius 60 from center, alternating
  const outerRadius = 60;
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 + 15) * Math.PI / 180;
    const type = i % 2 === 0 ? 'white' : 'black';
    pieces.push({
      id: `${type}_${Math.floor(i / 2)}_outer`,
      x: center + outerRadius * Math.cos(angle),
      y: center + outerRadius * Math.sin(angle),
      vx: 0,
      vy: 0,
      radius: COIN_RADIUS,
      type,
      pocketed: false,
    });
  }

  return pieces;
}

function dist(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function checkPocket(piece: Piece): boolean {
  for (const pocket of POCKETS) {
    if (dist(piece, pocket) < POCKET_RADIUS) {
      return true;
    }
  }
  return false;
}

function resolveCollision(a: Piece, b: Piece): void {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  const minDist = a.radius + b.radius;

  if (d >= minDist || d === 0) return;

  // Normal vector
  const nx = dx / d;
  const ny = dy / d;

  // Separate overlapping pieces
  const overlap = minDist - d;
  a.x -= nx * overlap / 2;
  a.y -= ny * overlap / 2;
  b.x += nx * overlap / 2;
  b.y += ny * overlap / 2;

  // Relative velocity in collision normal direction
  const dvx = a.vx - b.vx;
  const dvy = a.vy - b.vy;
  const dvn = dvx * nx + dvy * ny;

  // Only resolve if pieces are moving toward each other
  if (dvn <= 0) return;

  // Equal mass elastic collision with restitution
  const j = dvn * RESTITUTION;
  a.vx -= j * nx;
  a.vy -= j * ny;
  b.vx += j * nx;
  b.vy += j * ny;
}

function wallBounce(piece: Piece): void {
  const margin = piece.radius;

  if (piece.x < margin) {
    piece.x = margin;
    piece.vx = Math.abs(piece.vx) * RESTITUTION;
  } else if (piece.x > BOARD_SIZE - margin) {
    piece.x = BOARD_SIZE - margin;
    piece.vx = -Math.abs(piece.vx) * RESTITUTION;
  }

  if (piece.y < margin) {
    piece.y = margin;
    piece.vy = Math.abs(piece.vy) * RESTITUTION;
  } else if (piece.y > BOARD_SIZE - margin) {
    piece.y = BOARD_SIZE - margin;
    piece.vy = -Math.abs(piece.vy) * RESTITUTION;
  }
}

export function simulateStrike(
  boardPieces: Piece[],
  strikerX: number,
  strikerY: number,
  angle: number,
  power: number
): StrikeResult {
  // Clone pieces
  const pieces = boardPieces
    .filter((p) => !p.pocketed)
    .map((p) => ({ ...p }));

  // Create striker
  const radAngle = (angle * Math.PI) / 180;
  const speed = power * 8;
  const striker: Piece = {
    id: 'striker',
    x: strikerX,
    y: strikerY,
    vx: speed * Math.cos(radAngle),
    vy: speed * Math.sin(radAngle),
    radius: STRIKER_RADIUS,
    type: 'striker',
    pocketed: false,
  };

  const allPieces = [...pieces, striker];
  const pocketed: Piece[] = [];
  let strikerPocketed = false;

  // Run simulation
  for (let step = 0; step < MAX_STEPS; step++) {
    // Update positions
    for (const p of allPieces) {
      if (p.pocketed) continue;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= FRICTION;
      p.vy *= FRICTION;

      // Stop very slow pieces
      if (Math.abs(p.vx) < MIN_VELOCITY && Math.abs(p.vy) < MIN_VELOCITY) {
        p.vx = 0;
        p.vy = 0;
      }
    }

    // Check collisions between all pairs
    const active = allPieces.filter((p) => !p.pocketed);
    for (let i = 0; i < active.length; i++) {
      for (let j = i + 1; j < active.length; j++) {
        resolveCollision(active[i], active[j]);
      }
    }

    // Wall bounces
    for (const p of active) {
      wallBounce(p);
    }

    // Check pocketing
    for (const p of active) {
      if (checkPocket(p)) {
        p.pocketed = true;
        p.vx = 0;
        p.vy = 0;
        if (p.type === 'striker') {
          strikerPocketed = true;
        } else {
          pocketed.push({ ...p });
        }
      }
    }

    // Check if all pieces stopped
    const moving = allPieces.filter(
      (p) => !p.pocketed && (Math.abs(p.vx) > MIN_VELOCITY || Math.abs(p.vy) > MIN_VELOCITY)
    );
    if (moving.length === 0) break;
  }

  // Remove striker from final state, keep only coins
  const finalPieces = allPieces.filter((p) => p.type !== 'striker');

  return {
    pieces: finalPieces,
    pocketed,
    strikerPocketed,
    foul: strikerPocketed,
  };
}

export function calculateScore(
  pocketed: Piece[],
  playerColor: 'white' | 'black',
  strikerPocketed: boolean
): { points: number; continueTurn: boolean } {
  let points = 0;
  let ownPocketed = false;

  for (const coin of pocketed) {
    if (coin.type === playerColor) {
      points += 1;
      ownPocketed = true;
    } else if (coin.type === 'queen') {
      points += 3;
      ownPocketed = true;
    } else {
      // Opponent's coin — they get the point (handled by caller)
      // We don't subtract here; caller adds to opponent
    }
  }

  if (strikerPocketed) {
    points -= 1;
  }

  return {
    points,
    continueTurn: ownPocketed && !strikerPocketed,
  };
}
