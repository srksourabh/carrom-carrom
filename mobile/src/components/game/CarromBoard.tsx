import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';

const BOARD_RENDER_SIZE = 320;
const BOARD_UNITS = 700;
const SCALE = BOARD_RENDER_SIZE / BOARD_UNITS;

interface Piece {
  id: string;
  x: number;
  y: number;
  radius: number;
  type: 'white' | 'black' | 'queen' | 'striker';
  pocketed: boolean;
}

interface Props {
  pieces: Piece[];
  strikerX?: number;
  strikerY?: number;
  isMyTurn?: boolean;
}

const PIECE_COLORS: Record<string, string> = {
  white: '#FFF8E1',
  black: '#37474F',
  queen: colors.error,
  striker: colors.primary,
};

const PIECE_BORDER: Record<string, string> = {
  white: '#D7CCC8',
  black: '#263238',
  queen: '#B71C1C',
  striker: colors.primaryDark,
};

export function CarromBoard({ pieces, strikerX, strikerY }: Props) {
  const activePieces = pieces.filter((p) => !p.pocketed);

  return (
    <View style={styles.boardWrapper}>
      <View style={styles.board}>
        {/* Pocket indicators */}
        {[
          { x: 35, y: 35 },
          { x: BOARD_UNITS - 35, y: 35 },
          { x: 35, y: BOARD_UNITS - 35 },
          { x: BOARD_UNITS - 35, y: BOARD_UNITS - 35 },
        ].map((pocket, i) => (
          <View
            key={`pocket-${i}`}
            style={[
              styles.pocket,
              {
                left: pocket.x * SCALE - 14,
                top: pocket.y * SCALE - 14,
              },
            ]}
          />
        ))}

        {/* Board lines */}
        <View style={styles.innerRect} />
        <View style={styles.centerCircle} />

        {/* Baseline indicators */}
        <View style={[styles.baseline, { top: (BOARD_UNITS - 70) * SCALE }]} />
        <View style={[styles.baseline, { top: 70 * SCALE }]} />

        {/* Coins */}
        {activePieces.map((piece) => (
          <View
            key={piece.id}
            style={[
              styles.piece,
              {
                left: piece.x * SCALE - piece.radius * SCALE,
                top: piece.y * SCALE - piece.radius * SCALE,
                width: piece.radius * 2 * SCALE,
                height: piece.radius * 2 * SCALE,
                borderRadius: piece.radius * SCALE,
                backgroundColor: PIECE_COLORS[piece.type],
                borderColor: PIECE_BORDER[piece.type],
              },
            ]}
          />
        ))}

        {/* Striker position indicator */}
        {strikerX !== undefined && strikerY !== undefined && (
          <View
            style={[
              styles.striker,
              {
                left: strikerX * SCALE - 17 * SCALE,
                top: strikerY * SCALE - 17 * SCALE,
                width: 34 * SCALE,
                height: 34 * SCALE,
                borderRadius: 17 * SCALE,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardWrapper: {
    alignItems: 'center',
    padding: 8,
  },
  board: {
    width: BOARD_RENDER_SIZE,
    height: BOARD_RENDER_SIZE,
    backgroundColor: '#F5DEB3',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#8B4513',
    position: 'relative',
    overflow: 'hidden',
  },
  pocket: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E1503',
  },
  innerRect: {
    position: 'absolute',
    left: 50 * SCALE,
    top: 50 * SCALE,
    width: 600 * SCALE,
    height: 600 * SCALE,
    borderWidth: 1,
    borderColor: '#D2B48C',
    borderRadius: 4,
  },
  centerCircle: {
    position: 'absolute',
    left: (BOARD_UNITS / 2) * SCALE - 40 * SCALE,
    top: (BOARD_UNITS / 2) * SCALE - 40 * SCALE,
    width: 80 * SCALE,
    height: 80 * SCALE,
    borderRadius: 40 * SCALE,
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  baseline: {
    position: 'absolute',
    left: 80 * SCALE,
    width: (BOARD_UNITS - 160) * SCALE,
    height: 1,
    backgroundColor: '#D2B48C',
  },
  piece: {
    position: 'absolute',
    borderWidth: 1.5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  striker: {
    position: 'absolute',
    backgroundColor: 'rgba(27, 94, 32, 0.4)',
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
});
