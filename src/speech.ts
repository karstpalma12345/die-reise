// Spraak: voorlezen met de Duitse stem van het toestel en opnemen met de microfoon. Alles blijft op het toestel; opnames worden niet opgeslagen.
export const speechOk = typeof window !== 'undefined' && 'speechSynthesis' in window;
export const recordOk = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined';
function germanVoice(): SpeechSynthesisVoice | undefined {
  const vs = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('de'));
  return vs.find((v) => ['anna', 'petra', 'helena', 'marlene', 'vicki', 'katja', 'female'].some((n) => v.name.toLowerCase().includes(n))) ?? vs[0];
}
export function speak(text: string, slow = false): void {
  if (!speechOk || !text) return;
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'de-DE'; const v = germanVoice(); if (v) u.voice = v; u.rate = slow ? 0.6 : 0.9; speechSynthesis.speak(u);
}
export const stopSpeaking = () => { if (speechOk) speechSynthesis.cancel(); };
export async function startRecording(): Promise<{ stop: () => Promise<string> }> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); const rec = new MediaRecorder(stream); const chunks: Blob[] = [];
  rec.ondataavailable = (e) => chunks.push(e.data); rec.start();
  return { stop: () => new Promise((res) => { rec.onstop = () => { stream.getTracks().forEach((t) => t.stop()); res(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/mp4' }))); }; rec.stop(); }) };
}
