# Tekent het app-logo (Karst + Carla in de huidige stijl) als SVG en PNG. Gebruik: python3 tools/make_icons.py
from PIL import Image, ImageDraw
import math
INK, PINK, GILL, CHEEK = '#17424a', '#f9bccb', '#e8607e', '#f5a3b8'
def qb(p0, c, p1, n=20):
    return [((1-t)**2*p0[0]+2*(1-t)*t*c[0]+t*t*p1[0], (1-t)**2*p0[1]+2*(1-t)*t*c[1]+t*t*p1[1]) for t in [i/n for i in range(n+1)]]
def build(s=1.0):
    ops = []
    T = lambda x, y: (256+(x-256)*s, 256+(y-256)*s)
    def ell(cx, cy, rx, ry, f): x, y = T(cx, cy); ops.append(('ell', x, y, rx*s, ry*s, f))
    def line(pts, c, w): ops.append(('line', [T(*p) for p in pts], c, w*s))
    def poly(pts, f): ops.append(('poly', [T(*p) for p in pts], f))
    ell(420, 90, 62, 62, '#ffe3a8'); ell(420, 90, 46, 46, '#ffd27a')
    def karst(ox, oy, k):
        m = lambda x, y: (ox+k*x, oy+k*y)
        for mir in (0, 1):
            X = (lambda x: 160-x) if mir else (lambda x: x)
            for a, b in [((36, 70), (10, 52)), ((32, 84), (4, 84)), ((36, 98), (10, 116))]:
                line([m(X(a[0]), a[1]), m(X(b[0]), b[1])], GILL, 8*k); ell(*m(X(b[0]), b[1]), 6*k, 6*k, GILL)
        ell(*m(80, 84), 56*k, 48*k, PINK); ell(*m(44, 96), 7*k, 7*k, CHEEK); ell(*m(116, 96), 7*k, 7*k, CHEEK)
        for x in (58, 102): ell(*m(x, 78), 7*k, 7*k, INK); ell(*m(x+2.1, 75.6), 2.2*k, 2.2*k, '#fff')
        line([m(*p) for p in qb((66, 98), (80, 110.6), (94, 98))], INK, 4.5*k)
        top = qb((42, 126), (80, 144), (118, 126)); bot = qb((118, 142), (80, 158), (42, 142)); poly([m(*p) for p in top+bot], '#137f86')
    def carla(ox, oy, k):
        m = lambda x, y: (ox+k*x, oy+k*y)
        ell(*m(80, 96), 58*k, 46*k, '#7cc576'); ell(*m(50, 56), 22*k, 22*k, '#7cc576'); ell(*m(110, 56), 22*k, 22*k, '#7cc576')
        for x in (50, 110): ell(*m(x, 57), 14*k, 14*k, '#fff'); ell(*m(x, 57), 7*k, 7*k, INK); ell(*m(x+2.1, 54.6), 2.2*k, 2.2*k, '#fff')
        for a, b in [((34, 46), (26, 41)), ((40, 38), (36, 29)), ((126, 46), (134, 41)), ((120, 38), (124, 29))]: line([m(*a), m(*b)], INK, 3*k)
        ell(*m(38, 104), 7*k, 7*k, '#f1b0a8'); ell(*m(122, 104), 7*k, 7*k, '#f1b0a8')
        line([m(*p) for p in qb((62, 106), (80, 122.2), (98, 106))], INK, 4.5*k)
        fx, fy = 122, 26
        for a in range(0, 360, 72): ell(*m(fx+10*math.cos(math.radians(a)), fy+10*math.sin(math.radians(a))), 6.5*k, 6.5*k, '#f6b94b'); ell(*m(fx+10*math.cos(math.radians(a)), fy+10*math.sin(math.radians(a))), 5*k, 5*k, '#fff')
        ell(*m(fx, fy), 5*k, 5*k, '#f6b94b')
    karst(12, 150, 1.8); carla(172, 150, 1.8)
    return ops
def water(): return [(x, 414+7*math.sin(x/512*4*math.pi)) for x in range(0, 513, 8)]
def to_png(ops, size, path, ss=4):
    S = size*ss/512; im = Image.new('RGB', (size*ss, size*ss)); d = ImageDraw.Draw(im)
    for y in range(size*ss):
        t = min(1, y/(414*S)); d.line([(0, y), (size*ss, y)], fill=tuple(int(a+(b-a)*t) for a, b in zip((255, 229, 189), (255, 246, 232))))
    d.polygon([(x*S, y*S) for x, y in water()]+[(size*ss, size*ss), (0, size*ss)], fill='#4fb8b8')
    d.line([(x*S, (y+22)*S) for x, y in water()], fill='#9fe0dd', width=int(4*S))
    for o in ops:
        if o[0] == 'ell': _, x, y, rx, ry, f = o; d.ellipse([(x-rx)*S, (y-ry)*S, (x+rx)*S, (y+ry)*S], fill=f)
        elif o[0] == 'poly': d.polygon([(x*S, y*S) for x, y in o[1]], fill=o[2])
        else:
            pts = [(x*S, y*S) for x, y in o[1]]; w = o[3]*S; d.line(pts, fill=o[2], width=int(w), joint='curve')
            for x, y in pts[:: max(1, len(pts)-1)]: d.ellipse([x-w/2, y-w/2, x+w/2, y+w/2], fill=o[2])
    im.resize((size, size), Image.LANCZOS).save(path)
def to_svg(ops, path):
    e = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe5bd"/><stop offset=".8" stop-color="#fff6e8"/></linearGradient></defs><rect width="512" height="512" fill="url(#g)"/>']
    e.append('<polygon fill="#4fb8b8" points="%s 512,512 0,512"/>' % ' '.join('%d,%.1f' % p for p in water()))
    for o in ops:
        if o[0] == 'ell': e.append('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s"/>' % o[1:])
        elif o[0] == 'poly': e.append('<polygon fill="%s" points="%s"/>' % (o[2], ' '.join('%.1f,%.1f' % p for p in o[1])))
        else: e.append('<polyline fill="none" stroke="%s" stroke-width="%.1f" stroke-linecap="round" stroke-linejoin="round" points="%s"/>' % (o[2], o[3], ' '.join('%.1f,%.1f' % p for p in o[1])))
    open(path, 'w').write(''.join(e)+'</svg>')
if __name__ == '__main__':
    a = build(1.0); m = build(0.8)
    to_svg(a, 'public/icon.svg')
    for n, sz in [('icon-192.png', 192), ('icon-512.png', 512), ('apple-touch-icon.png', 180)]: to_png(a, sz, 'public/' + n)
    to_png(m, 512, 'public/icon-maskable-512.png'); print('icons ok')
