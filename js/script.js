// Fill current year
document.getElementById('year').textContent = new Date().getFullYear();

// Utility to format numbers
function fmt(n) {
  return (typeof n === 'number') ? n.toLocaleString('en-KE', {maximumFractionDigits:2}) : n;
}

function calculateImport() {
  // Read user inputs
  const invoice = Number(document.getElementById('invoice').value) || 0;
  const freight = Number(document.getElementById('freight').value) || 0;
  const insurance = Number(document.getElementById('insurance').value) || 0;
  const exrate = Number(document.getElementById('exrate').value) || 1;

  const importDutyPct = Number(document.getElementById('importDuty').value) || 0;
  let excisePct = Number(document.getElementById('exciseDuty').value);
  const vatPct = Number(document.getElementById('vat').value) || 0;
  const idfPct = Number(document.getElementById('idf').value) || 0;
  const rdlPct = Number(document.getElementById('rdl').value) || 0;

  const engine = Number(document.getElementById('engine').value) || 0;
  const fuel = document.getElementById('fuel').value || 'gasoline';

  if(!excisePct || excisePct === 0){
    excisePct = engine <= 1500 ? 20 : 25;
  }

  // CIF in USD
  const cifUsd = invoice + freight + insurance;
  const cifKes = cifUsd * exrate;

  const importDutyVal = cifKes * (importDutyPct / 100);
  const exciseBase = cifKes + importDutyVal;
  const exciseVal = exciseBase * (excisePct / 100);
  const vatBase = cifKes + importDutyVal + exciseVal;
  const vatVal = vatBase * (vatPct / 100);
  const idfVal = cifKes * (idfPct / 100);
  const rdlVal = cifKes * (rdlPct / 100);

  const otherEstimate = 50000; // flat estimate

  const totalKes = cifKes + importDutyVal + exciseVal + vatVal + idfVal + rdlVal + otherEstimate;

  // Show results
  const resultBox = document.getElementById('resultBox');
  resultBox.style.display = 'block';
  document.getElementById('cifUsd').textContent = fmt(cifUsd) + " USD";
  document.getElementById('cifKes').textContent = fmt(cifKes) + " KES";
  document.getElementById('impDutyVal').textContent = fmt(importDutyVal) + " KES";
  document.getElementById('exciseVal').textContent = fmt(exciseVal) + " KES";
  document.getElementById('vatVal').textContent = fmt(vatVal) + " KES";
  document.getElementById('idfVal').textContent = fmt(idfVal) + " KES";
  document.getElementById('rdlVal').textContent = fmt(rdlVal) + " KES";
  document.getElementById('otherVal').textContent = fmt(otherEstimate) + " KES";
  document.getElementById('totalKes').textContent = fmt(totalKes) + " KES";
}

function resetCalc() {
  document.getElementById('invoice').value = 5000;
  document.getElementById('freight').value = 800;
  document.getElementById('insurance').value = 100;
  document.getElementById('exrate').value = 130;
  document.getElementById('engine').value = 1500;
  document.getElementById('fuel').value = 'gasoline';
  document.getElementById('importDuty').value = 35;
  document.getElementById('exciseDuty').value = 20;
  document.getElementById('vat').value = 16;
  document.getElementById('idf').value = 3.5;
  document.getElementById('rdl').value = 2;
  document.getElementById('resultBox').style.display = 'none';
}
