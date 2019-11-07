var danhSachNhanVien = new DanhSachNhanVien();
getLocalStorage();


// T && T = T
// F && T = F
// Khi điều kiện false nằm đầu tiên thì lập tức sẽ javascript sẽ không
// chạy đến điều kiện thứ 2

var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}
getEle("btnThem").addEventListener("click", function () {
    console.log("ok");
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";
    getEle("msnv").removeAttribute("disabled");
});
getEle("btnThemNV").addEventListener("click", function () {
    var maNV = getEle("msnv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;
    //-----------------------------------------------------
    var nhanVien = new NhanVien(maNV, hoTen, email, password, date, chucVu);
    var isValid = true;
    /* MaNV */
    isValid &= validation.kiemTraRong(maNV, "tbMaNV", "Mã nhân viên") && validation.kiemTraTrungMaNV(
        maNV,
        "tbMaNV",
        "MaNV trùng",
        danhSachNhanVien.mangNhanVien);

    console.log(isValid);
    /* HoTen */
    isValid &= validation.kiemTraRong(hoTen, "tbTen", "Họ và tên") && validation.kiemTraChuoi(hoTen, "tbTen", "(*) Vui lòng nhập vào dạng chuỗi");


    /* Email */
    isValid &= validation.kiemTraRong(email, "tbEmail", "Email") && validation.kiemTraEmail(email, "tbEmail", "(*) Vui lòng nhập đúng cú pháp email");

    /*Password*/
    isValid &= validation.kiemTraRong(password, "tbMatKhau", "Mật khẩu") && validation.kiemTraKiTu(password, "tbMatKhau", "(*) Kí tự phải từ 6 - 12", 6, 12);

    /* Chức vụ */
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", " (*) Vui lòng chọn chức vụ.");
    /* "chucvu" trong kiểm tra chức vụ là thẻ id chứ ko phải là biến var. Vì "chucVu" là  ô input (không nhập) nên không thể nào lấy value được */

    if (isValid) {
        console.log("OK hết!!");
        var nhanVien = new NhanVien(maNV, hoTen, email, password, date, chucVu);
        danhSachNhanVien.themNV(nhanVien);
        taoBang();
        setLocalStorage();
    }
});
//Lưu mảng xuống localStorage
function setLocalStorage() {
    //Khi lưu xuống localStorage chuyển data thành string
    // DanhSachNhanVien là cái key (tên gì cũng được)
    localStorage.setItem("DanhSachNhanVien",
        JSON.stringify(danhSachNhanVien.mangNhanVien))
    // .stringify lưu dưới dạng chuỗi
}
// Local Storage khi F5 thì sẽ mất dữ liệu

/* Lấy mảng từ localStorage */
function getLocalStorage() {
    //Khi lấy localstorage lên sử dụng chuyển thành json
    if (localStorage.getItem("DanhSachNhanVien")) {
        danhSachNhanVien.mangNhanVien = JSON.parse(localStorage.getItem("DanhSachNhanVien"));
        //     Vì chuỗi hiện tại là chuỗi nên JSON.parse để lấy dữ liệu
    };

    /* Phải bỏ trong if để kiểm tra check null dữ liệu đầu vào. Nếu tester xóa đi và bấm F5 thì sẽ mất toang nên
    mới bỏ vô if*/

    taoBang();
}
/**
 * Cập nhật Nhân Viên
 */
getEle("btnCapNhat").addEventListener("click", function() {
    var maNV = getEle("msnv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;
    var nhanVien = new NhanVien(maNV, hoTen, email, password, date, chucVu);
    console.log(nhanVien);
    danhSachNhanVien.capNhatNhanVien(nhanVien);
    taoBang();
    setLocalStorage();
    
});
/** 
 * Cập nhật người dùng
 * 
*/
DanhSachNhanVien.prototype.capNhatNhanVien = function(nhanVien) {
    var viTri = this.timViTri(nhanVien.maNV);
    if(viTri !== -1) {
        this.mangNhanVien[viTri] = nhanVien;
    }
}
/**
 * 
 *Tìm Kiếm
 */
getEle("searchName").addEventListener("keyup", function() {
    var chuoiTimKiem = getEle("searchName").value;
    console.log(chuoiTimKiem);
    var mangTimKiem = danhSachNhanVien.timNhanVien(chuoiTimKiem);
    taoBang(mangTimKiem);
});




/**
 * Xóa nhân viên
 */
function xoa(maNV) {
    console.log(maNV);
    danhSachNhanVien.XoaNhanVien(maNV);
    taoBang();

}

/**
 * Sửa nhân viên
 */
function suaNhanVien(maNV) {
    console.log(123);
    getEle("btnCapNhat").style.display = "block";
    getEle("btnThemNV").style.display = "none";

    var nhanVien = danhSachNhanVien.layThongTinNguoiDung(maNV);
    console.log(nhanVien);

    getEle("msnv").value = nhanVien.maNV;
    getEle("msnv").setAttribute("disabled", true);
    getEle("name").value = nhanVien.hoTen;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.password;
    getEle("datepicker").value = nhanVien.date;
    getEle("chucvu").value = nhanVien.chucVu;
    
}

function taoBang(mang = danhSachNhanVien.mangNhanVien) {
 

    /**
     * String template
     */

/*
    var name2 = "cybersoft";
    var result2 = `Hello ${name2}` // => Hello Cybersoft
    console.log(danhsachNhanVien.mangNhanVien); */
    
    var tbody = getEle("tableDanhSach");
    var content = "";
    mang.map(function (item, index) {
        content += `
        <tr>
            <td>${item.maNV}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.date}</td>
            <td>${item.chucVu}</td>
            <td>
            <button class="btn btn-success" data-toggle="modal"
            data-target="#myModal" onclick="suaNhanVien('${item.maNV}')">Sửa</button>

            <button class="btn btn-danger" onclick="xoa('${item.maNV}')">Xóa</button>
            </td>

        </tr>
        `
    });
    tbody.innerHTML = content;

}







// pattern này kiểm tra cách chuỗi
// function kiemTraChuoi(input, spanId, message) {
//     var pattern = new RegExp(

//         "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

//         "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

//         "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

//     );
//     if (pattern.test(input)) {
//         //Hợp lệ
//         getEle(spanId).style.display = "none";
//         getEle(spanId).innerHTML = "";
//         return true;
//     }
//     // Không hợp lệ
//     getEle(spanId).style.display = "block";
//     getEle(spanId).innerHTML = message;
// }
// function kiemTraChucVu(id, spanId, message) {
//     console.log(getEle(id).selectedIndex);
//     if (getEle(id).selectedIndex !== 0) {
//         //Hợp lệ
//         getEle(spanId).style.display = "none";
//         getEle(spanId).innerHTML = "";
//         return true;
//     }
//     // Không hợp lệ
//     getEle(spanId).style.display = "block";
//     getEle(spanId).innerHTML = message;
//     return false;
// }
// function kiemTraKiTu(input, spanId, message, min, max) {
//     if (input.length >= min && input.length <= max) {
//         //HỢp lệ
//         getEle(spanId).style.display = "none";
//         getEle(spanId).innerHTML = "";
//         return true;
//     }
//     //Hợp lệ
//     getEle(spanId).style.display = "block";
//     getEle(spanId).innerHTML = message;
// }
// function kiemTraEmail(input, spanId, message) {
//     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (input.match(mailformat)) {
//         //Hợp lệ
//         getEle(spanId).style.display = "none";
//         getEle(spanId).innerHTML = "";
//         return true;
//     }
//     getEle(spanId).style.display = "block";
//     getEle(spanId).innerHTML = message;
// }

// function kiemTraRong(input, spanId, message) {
//     if (input === "") {
//         getEle(spanId).style.display = "block";
//         getEle(spanId).innerHTML = "(*)" + message + " không được rỗng";
//         return false;
//     } else {
//         getEle(spanId).style.display = "none";
//         return true;
//     }
// }