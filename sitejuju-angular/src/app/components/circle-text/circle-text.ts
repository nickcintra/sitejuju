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

  /** Seção da rota (fotos/videos/design) → palavra no círculo a riscar. */
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

  /* Palavras no círculo com bolinha entre cada uma; 2 de cada para ficar igual */
  private readonly segments: { text: string; wordId: WordId }[] = [
    { text: 'photo ', wordId: 'photo' },
    { text: '• ', wordId: null },
    { text: 'video ', wordId: 'video' },
    { text: '• ', wordId: null },
    { text: 'design ', wordId: 'design' },
    { text: '• ', wordId: null },
    { text: 'photo ', wordId: 'photo' },
    { text: '• ', wordId: null },
    { text: 'video ', wordId: 'video' },
    { text: '• ', wordId: null },
    { text: 'design ', wordId: 'design' },
    { text: '• ', wordId: null },
  ];

  private readonly baseChars: CharBase[] = this.buildBaseChars();

  protected readonly chars = computed(() => this.baseChars.map((c) => ({ ...c })));

  /** Um arco por ocorrência da palavra ativa (consecutivos no círculo). */
  protected readonly activeWordArcs = computed(() => {
    const active = this.activeWord();
    if (!active) return [];
    const runs: { start: number; end: number }[] = [];
    let run: { start: number; end: number } | null = null;
    for (const c of this.baseChars) {
      if (c.wordId === active) {
        if (!run) run = { start: c.rotation, end: c.rotation };
        else run.end = c.rotation;
      } else if (run) {
        runs.push({ start: run.start, end: run.end });
        run = null;
      }
    }
    if (run) runs.push({ start: run.start, end: run.end });
    return runs;
  });

  /** Raio do círculo (igual ao transform-origin do .texto span: 0 200px). Mesma lógica de “texto em path”: um círculo, ângulo por letra. */
  private readonly textRadius = 200;
  private readonly circleCenter = 200;

  /** Ponto no círculo para um ângulo (graus). Ajustado em -90° para alinhar com o CSS rotate. */
  private pointOnCircle(cx: number, cy: number, radius: number, deg: number): { x: number; y: number } {
    // Subtraímos 90 graus aqui para compensar o deslocamento
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  /** Arco do risco: mesmo círculo e mesmos ângulos (arc.start, arc.end) do texto. Raio ligeiramente menor = risco no meio da altura da letra. */
  protected readonly arcPaths = computed(() => {
    const arcs = this.activeWordArcs();
    if (arcs.length === 0) return [];
    
    const cx = this.circleCenter;
    const cy = this.circleCenter;
    const r = this.textRadius - 24;
    
    // 2 graus de margem para estender a linha um pouco para fora da palavra
    const pad = 2; 
    
    return arcs.map((arc) => {
      // INVERTA OS SINAIS: - no start (começa antes) e + no end (termina depois)
      const start = arc.start - pad; 
      const end = arc.end + pad; 
      
      const p1 = this.pointOnCircle(cx, cy, r, start);
      const p2 = this.pointOnCircle(cx, cy, r, end);
      return `M ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y}`;
    });
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
