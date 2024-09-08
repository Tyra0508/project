// Lưu biến id với giá trị 1 vào bộ nhớ local của web
localStorage.setItem('id', '1');

// Kiểm tra xem việc lưu trữ có thành công không
if (localStorage.getItem('id') === '1') {
    console.log('Đã lưu id thành công vào bộ nhớ local');
} else {
    console.log('Có lỗi khi lưu id vào bộ nhớ local');
}

function collectData() {
    const data = {
        id: localStorage.getItem('id'), // Thêm id người dùng từ localStorage
        benhVien: {
            ten: '',
            khoangCach: ''
        },
        chuyenKham: [],
        chuyenKhoa: [],
        thoiGian: {
            ngay: '',
            khungGio: ''
        },
        thongTinBenhNhan: {
            hoTen: '',
            ngaySinh: '',
            diaChi: '',
            ghiNhoDiaChi: false
        }
    };
    
    // Lấy tên bệnh viện và khoảng cách
    data.benhVien.ten = document.querySelector('.hospital-name').textContent;
    data.benhVien.khoangCach = document.querySelector('.distance').textContent;

    // Thu thập dữ liệu từ section-1
    document.querySelectorAll('.section-1 .checkbox-label.active').forEach(label => {
        if (label.textContent.trim() === 'Đa khoa') {
            data.chuyenKhoa.push(label.textContent.trim());
        } else {
            data.chuyenKham.push(label.textContent.trim());
        }
    });

    data.thoiGian.ngay = document.getElementById('date-slot').value;
    data.thoiGian.khungGio = document.getElementById('time-slot').value;

    // Thu thập dữ liệu từ section
    data.thongTinBenhNhan.hoTen = document.querySelector('.section input[placeholder="Họ tên"]').value;
    data.thongTinBenhNhan.ngaySinh = document.querySelector('.section input[placeholder="Ngày tháng năm sinh"]').value;
    data.thongTinBenhNhan.diaChi = document.querySelector('.section input[placeholder="Địa chỉ"]').value;
    data.thongTinBenhNhan.ghiNhoDiaChi = document.querySelector('.section input[type="checkbox"]').checked;

    return data;
}

document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.querySelector('.confirm-button');
    if (confirmButton) {
        confirmButton.addEventListener('click', function() {
            const data = collectData();
            
            // Gửi dữ liệu đến server
            fetch('http://localhost:5000/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log('Dữ liệu đã được lưu:', result);
                // Ẩn hộp xác nhận
                document.querySelector('.confirmation-container').style.display = 'none';
            })
            .catch(error => {
                console.error('Lỗi khi lưu dữ liệu:', error);
            });
        });
    } else {
        console.error('Không tìm thấy phần tử có class "confirm-button"');
    }
});