//pattern này kiểm tra cách chuỗi
function Validation() {
    this.kiemTraTrungMaNV = function (input, spanId, message, mangNhanVien) {
        /* 1. Duyệt mảng
            2. So sánh input có trùng MaNV 
            3. Nếu như input trùng MaNV trong mảng => return flase
            4. Ngược lại => Return true
        */
        var check = mangNhanVien.some(function (item) {
            return input === item.maNV;
        });


        if (check) {
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = message;
            return false;
        } else {
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        console.log(check);

        // var check = true;
        // mangNhanVien.map(function (item) {
        //     if (input === item.maNV) {
        //         getEle(spanId).style.display = "block";
        //         getEle(spanId).innerHTML = message;
        //         check = false; //return ở đây vẫn chạy tiếp
        //     } else {
        //         getEle(spanId).style.display = "none";
        //         getEle(spanId).innerHTML = "";
        //         check = true;
        //     }
        // });
        // return check;
    };
    this.kiemTraRong = function (input, spanId, message) {
        if (input === "") {
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = "(*)" + message + " không được rỗng";
            return false;
        } else {
            getEle(spanId).style.display = "none";
            return true;
        }
    };
    this.kiemTraChucVu = function (id, spanId, message) {
        console.log(getEle(id).selectedIndex);
        if (getEle(id).selectedIndex !== 0) {
            //Hợp lệ
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        // Không hợp lệ
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = message;
        return false;
    };
    this.kiemTraKiTu = function (input, spanId, message, min, max) {
        if (input.length >= min && input.length <= max) {
            //HỢp lệ
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        // Không Hợp lệ
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = message;
        return false;
    };
    this.kiemTraEmail = function (input, spanId, message) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(1234);
        if (input.match(mailformat)) {
            //Hợp lệ
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = message;
        return false;
    };
    this.kiemTraChuoi = function (input, spanId, message) {
        var pattern = new RegExp(

            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

        );
        if (pattern.test(input)) {
            //Hợp lệ
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        // Không hợp lệ
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = message;
        return false;
    }


}