// ECOSEM V.6 — Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1RoP3RwnWe5AagqcJFRSnnOphpscWomQ",
  authDomain: "ecosem-ot.firebaseapp.com",
  projectId: "ecosem-ot",
  storageBucket: "ecosem-ot.firebasestorage.app",
  messagingSenderId: "272808100999",
  appId: "1:272808100999:web:71d0358d64a9cebe5da422"
};

firebase.initializeApp(firebaseConfig);
const auth   = firebase.auth();
const db     = firebase.firestore();

db.enablePersistence({ synchronizeTabs: true }).catch(err => {
  console.warn('Offline persistence:', err.code);
});

async function fsGuardarOT(datos) {
  try {
    const ref = await db.collection('ordenes_trabajo').add({
      ...datos,
      creadoEn: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, id: ref.id };
  } catch(e) { return { success: false, message: e.message }; }
}

async function fsGetOTs(limit = 500) {
  try {
    const snap = await db.collection('ordenes_trabajo')
      .orderBy('creadoEn', 'desc').limit(limit).get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { return []; }
}

async function fsEliminarOT(id) {
  try { await db.collection('ordenes_trabajo').doc(id).delete(); return true; }
  catch(e) { return false; }
}

async function fsActualizarOT(id, datos) {
  try { await db.collection('ordenes_trabajo').doc(id).update(datos); return true; }
  catch(e) { return false; }
}

async function fsGetMecanicos() {
  try {
    const snap = await db.collection('mecanicos').orderBy('nombre').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { return []; }
}

async function fsAgregarMecanico(nombre) {
  try {
    const ref = await db.collection('mecanicos').add({ nombre, tipo: 'extra', fecha: new Date().toISOString().split('T')[0] });
    return { success: true, id: ref.id };
  } catch(e) { return { success: false, message: e.message }; }
}

async function fsEliminarMecanico(id) {
  try { await db.collection('mecanicos').doc(id).delete(); return true; }
  catch(e) { return false; }
}

async function fsGetInventario() {
  try {
    const snap = await db.collection('inventario').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { return []; }
}

async function fsGuardarItem(datos) {
  try {
    const ref = await db.collection('inventario').add(datos);
    return { success: true, id: ref.id };
  } catch(e) { return { success: false, message: e.message }; }
}

async function fsActualizarItem(id, datos) {
  try { await db.collection('inventario').doc(id).update(datos); return true; }
  catch(e) { return false; }
}

async function fsEliminarItem(id) {
  try { await db.collection('inventario').doc(id).delete(); return true; }
  catch(e) { return false; }
}

async function fsGetCalendario() {
  try {
    const snap = await db.collection('calendario').get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { return []; }
}

async function fsGuardarEvento(datos) {
  try {
    const ref = await db.collection('calendario').add(datos);
    return { success: true, id: ref.id };
  } catch(e) { return { success: false, message: e.message }; }
}

async function fsEliminarEvento(id) {
  try { await db.collection('calendario').doc(id).delete(); return true; }
  catch(e) { return false; }
}
