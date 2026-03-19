// ECOSEM - Sistema de Firma Digital para Mecánicos

let canvasFirma = null;
let ctxFirma = null;
let firmando = false;
let firmaGuardada = null;

function abrirFirmaDigital(otId, tipoFirma) {
  if (tipoFirma === 'mecanico' && S.rol !== 'mecanico' && S.rol !== 'admin') {
    toast('⛔ Solo mecánicos pueden firmar aquí', '#FF3B30');
    return;
  }
  
  const modalHTML = `
    <div id="modal-firma" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;">
      <div style="background:var(--dark2);border-radius:16px;padding:24px;max-width:600px;width:100%;border:1px solid var(--bdr2);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h3 style="color:var(--cyan);font-size:1.2rem;">✍️ Firma Digital - ${tipoFirma.toUpperCase()}</h3>
          <button onclick="cerrarFirmaDigital()" style="background:transparent;border:none;color:var(--mut);font-size:1.5rem;cursor:pointer;">✕</button>
        </div>
        <div style="text-align:center;color:var(--mut);margin-bottom:15px;font-size:0.9rem;">Dibuja tu firma con el dedo o mouse</div>
        <div style="background:#fff;border-radius:8px;overflow:hidden;border:2px solid var(--cyan);margin-bottom:15px;">
          <canvas id="canvas-firma" width="552" height="200" style="display:block;cursor:crosshair;touch-action:none;"></canvas>
        </div>
        <div style="color:var(--mut);font-size:0.85rem;margin-bottom:15px;text-align:center;">
          Nombre: <strong style="color:var(--cyan);">${S.nombre || 'Usuario'}</strong>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
          <button onclick="limpiarFirma()" class="btn-secondary">🗑️ Limpiar</button>
          <button onclick="cerrarFirmaDigital()" class="btn-secondary">❌ Cancelar</button>
          <button onclick="guardarFirma('${otId}', '${tipoFirma}')" class="btn-primary">✅ Guardar</button>
        </div>
      </div>
    </div>`;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  setTimeout(() => inicializarCanvas(), 100);
}

function inicializarCanvas() {
  canvasFirma = document.getElementById('canvas-firma');
  if (!canvasFirma) return;
  ctxFirma = canvasFirma.getContext('2d');
  ctxFirma.strokeStyle = '#000';
  ctxFirma.lineWidth = 2;
  ctxFirma.lineCap = 'round';
  ctxFirma.lineJoin = 'round';
  
  canvasFirma.addEventListener('mousedown', iniciarFirma);
  canvasFirma.addEventListener('mousemove', dibujarFirma);
  canvasFirma.addEventListener('mouseup', terminarFirma);
  canvasFirma.addEventListener('mouseleave', terminarFirma);
  
  canvasFirma.addEventListener('touchstart', (e) => { e.preventDefault(); const t=e.touches[0]; canvasFirma.dispatchEvent(new MouseEvent('mousedown',{clientX:t.clientX,clientY:t.clientY})); });
  canvasFirma.addEventListener('touchmove',  (e) => { e.preventDefault(); const t=e.touches[0]; canvasFirma.dispatchEvent(new MouseEvent('mousemove',{clientX:t.clientX,clientY:t.clientY})); });
  canvasFirma.addEventListener('touchend',   (e) => { e.preventDefault(); canvasFirma.dispatchEvent(new MouseEvent('mouseup',{})); });
}

function iniciarFirma(e) {
  firmando = true;
  const rect = canvasFirma.getBoundingClientRect();
  ctxFirma.beginPath();
  ctxFirma.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function dibujarFirma(e) {
  if (!firmando) return;
  const rect = canvasFirma.getBoundingClientRect();
  ctxFirma.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctxFirma.stroke();
}

function terminarFirma() { firmando = false; ctxFirma.closePath(); }

function limpiarFirma() {
  if (!ctxFirma || !canvasFirma) return;
  ctxFirma.clearRect(0, 0, canvasFirma.width, canvasFirma.height);
}

async function guardarFirma(otId, tipoFirma) {
  if (!canvasFirma) { toast('❌ Error: Canvas no encontrado', '#FF3B30'); return; }
  const imageData = ctxFirma.getImageData(0, 0, canvasFirma.width, canvasFirma.height);
  let hayDibujo = false;
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] !== 0) { hayDibujo = true; break; }
  }
  if (!hayDibujo) { toast('⚠️ Por favor dibuja tu firma primero', '#F5A623'); return; }
  
  showL('Guardando firma...');
  try {
    const firmaBase64 = canvasFirma.toDataURL('image/png');
    await db.collection('ordenes_trabajo').doc(otId).update({
      [`firma_${tipoFirma}`]: firmaBase64,
      [`firma_${tipoFirma}_nombre`]: S.nombre || 'Usuario',
      [`firma_${tipoFirma}_fecha`]: firebase.firestore.FieldValue.serverTimestamp()
    });
    hideL();
    toast('✅ Firma guardada correctamente', '#30D158');
    cerrarFirmaDigital();
    if (typeof actualizarVistaOT === 'function') actualizarVistaOT();
  } catch(e) {
    hideL();
    toast('❌ Error al guardar firma', '#FF3B30');
  }
}

function cerrarFirmaDigital() {
  document.getElementById('modal-firma')?.remove();
  canvasFirma = null; ctxFirma = null; firmando = false;
}

function obtenerFirmaHTML(firmaBase64, nombre) {
  if (!firmaBase64) return `<div class="firma-linea"><div style="height:50px;border-bottom:1.5px solid #000;margin-bottom:5px;"></div>${nombre || 'Nombre y Firma'}</div>`;
  return `<div class="firma-linea"><img src="${firmaBase64}" style="height:50px;max-width:100%;object-fit:contain;margin-bottom:5px;border-bottom:1.5px solid #000;" alt="Firma"><div style="font-size:8pt;margin-top:3px;">${nombre || 'Firmado digitalmente'}</div></div>`;
}

function generarBotonFirma(otId, tipoFirma, firmado = false) {
  const rol = S.rol;
  let mostrar = false;
  if (tipoFirma === 'mecanico'   && (rol === 'mecanico'  || rol === 'admin')) mostrar = true;
  if (tipoFirma === 'operador'   && (rol === 'operador'  || rol === 'admin')) mostrar = true;
  if (tipoFirma === 'supervisor' && (rol === 'supervisor'|| rol === 'admin')) mostrar = true;
  if (!mostrar) return '';
  const icono = firmado ? '✅' : '✍️';
  const texto = firmado ? 'Firmado' : 'Firmar OT';
  const color = firmado ? '#30D158' : '#00D4FF';
  return `<button onclick="abrirFirmaDigital('${otId}','${tipoFirma}')" style="background:${firmado?'rgba(48,209,88,0.2)':'rgba(0,212,255,0.2)'};border:1px solid ${color};color:${color};padding:8px 16px;border-radius:8px;font-size:0.85rem;cursor:pointer;">${icono} ${texto}</button>`;
}

console.log('✅ Sistema de firma digital cargado');
