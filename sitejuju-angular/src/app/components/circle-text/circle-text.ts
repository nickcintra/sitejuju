import { Component, input, computed } from '@angular/core';

type Section = 'fotos' | 'videos' | 'design';
type WordId = 'photo' | 'video' | 'design' | null;

interface CharBase {
  char: string;
  rotation: number;
  wordId: WordId;
}

interface WordLine {
  wordId: 'photo' | 'video' | 'design';
  centerRotation: number;
}

@Component({
  selector: 'app-circle-text',
  imports: [],
  templateUrl: './circle-text.html',
  styleUrl: './circle-text.css',
})
export class CircleText {
  /** Seção ativa do menu: 'fotos' → risca "photo", 'videos' → "video", 'design' → "design". Null = nenhuma riscada. */
  activeSection = input<Section | null>(null);

  private static sectionToWord(section: Section | null): WordId {
    if (!section) return null;
    const map: Record<Section, WordId> = {
      fotos: 'photo',
      videos: 'video',
      design: 'design',
    };
    return map[section] ?? null;
  }

  protected readonly activeWord = computed(() => CircleText.sectionToWord(this.activeSection()));

  private readonly segments: { text: string; wordId: WordId }[] = [
    { text: 'photo\n', wordId: 'photo' },
    { text: '-\n', wordId: null },
    { text: 'video\n', wordId: 'video' },
    { text: '-\n', wordId: null },
    { text: 'design\n', wordId: 'design' },
    { text: '-\n', wordId: null },
    { text: 'photo\n', wordId: 'photo' },
    { text: '-\n', wordId: null },
    { text: 'video\n', wordId: 'video' },
    { text: '-\n', wordId: null },
    { text: 'design\n', wordId: 'design' },
    { text: '-\n', wordId: null },
    { text: 'photo\n', wordId: 'photo' },
    { text: '-\n', wordId: null },
  ];

  /** Caracteres para exibir no círculo (sem risco por letra). */
  protected readonly chars: CharBase[] = this.buildBaseChars();

  /** Uma linha contínua por ocorrência de palavra (photo, video, design) — risca a palavra inteira. */
  protected readonly wordLines: WordLine[] = this.buildWordLines();

  private buildBaseChars(): CharBase[] {
    let textIndex = 0;
    const result: CharBase[] = [];
    for (const { text, wordId } of this.segments) {
      for (const char of text.split('')) {
        textIndex++;
        result.push({
          char,
          rotation: textIndex * 6.3,
          wordId,
        });
      }
    }
    return result;
  }

  private buildWordLines(): WordLine[] {
    const lines: WordLine[] = [];
    let textIndex = 0;
    for (const { text, wordId } of this.segments) {
      if (wordId !== null) {
        const firstRotation = (textIndex + 1) * 6.3;
        const lastRotation = (textIndex + text.length) * 6.3;
        const centerRotation = (firstRotation + lastRotation) / 2;
        lines.push({ wordId, centerRotation });
      }
      textIndex += text.length;
    }
    return lines;
  }
}
