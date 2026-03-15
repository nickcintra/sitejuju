import { Component, input, computed } from '@angular/core';

type Section = 'fotos' | 'videos' | 'design';
type WordId = 'photo' | 'video' | 'design' | null;

interface CharBase {
  char: string;
  rotation: number;
  wordId: WordId;
}

@Component({
  selector: 'app-circle-text',
  imports: [],
  templateUrl: './circle-text.html',
  styleUrl: './circle-text.css',
})
export class CircleText {
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

  /* Palavras no círculo sem bolinhas/separadores entre elas (conforme Figma, sem os •) */
  private readonly segments: { text: string; wordId: WordId }[] = [
    { text: 'photo ', wordId: 'photo' },
    { text: 'video ', wordId: 'video' },
    { text: 'design ', wordId: 'design' },
    { text: 'photo ', wordId: 'photo' },
    { text: 'video ', wordId: 'video' },
    { text: 'design ', wordId: 'design' },
    { text: 'photo ', wordId: 'photo' },
  ];

  private readonly baseChars: CharBase[] = this.buildBaseChars();

  /** Letras com risco (.spotted) só na palavra ativa — jeito que funcionava. */
  protected readonly chars = computed(() => {
    const active = this.activeWord();
    return this.baseChars.map((c) => ({
      ...c,
      spotted: c.wordId !== null && c.wordId === active,
    }));
  });

  private buildBaseChars(): CharBase[] {
    const totalChars = this.segments.reduce((acc, s) => acc + s.text.length, 0);
    const step = totalChars > 0 ? 360 / totalChars : 0;
    let index = 0;
    const result: CharBase[] = [];
    for (const { text, wordId } of this.segments) {
      for (const char of text.split('')) {
        index++;
        result.push({
          char,
          rotation: index * step,
          wordId,
        });
      }
    }
    return result;
  }
}
