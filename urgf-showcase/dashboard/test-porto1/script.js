// Fungsi sederhana untuk interaksi tombol agar terasa seperti aplikasi nyata
function toggleSelesai() {
    const btn = document.getElementById('btnSelesai');
    if(btn.classList.contains('active')) {
        btn.classList.remove('active');
        btn.innerText = 'Tandai Selesai';
    } else {
        btn.classList.add('active');
        btn.innerText = 'Selesai Dikerjakan ✓';
    }
}