function DanhSachNhanVien() {
    this.mangNhanVien = [];
    this.themNV = function(nhanVien) {
        this.mangNhanVien.push(nhanVien)
    };
    this.XoaNhanVien = function(maNV) {
        /*
        0. Tao 1 bien viTri = -1;
        1. Duyet mang
        2. Neu maNV === item.MaNV
        3. viTri = index;
        4. array.splice(viTri, 1);
         */
        var viTri = this.timViTri(maNV);
        if(viTri !== -1) {
            this.mangNhanVien.splice(viTri, 1);
        }
    };
    
    this.timViTri = function(maNV) {
        var viTri = -1;
        this.mangNhanVien.map(function(item, index){
            if(maNV === item.maNV) {
                viTri = index;
            }
        })
        return viTri;
    };
}

DanhSachNhanVien.prototype.layThongTinNguoiDung = function(maNV){
    var viTri = this.timViTri(maNV);
    return this.mangNhanVien[viTri];
};

DanhSachNhanVien.prototype.timNhanVien = function(chuoiTimKiem) {
    /**
     * 0. mangTimKiem = [];
     * 1. Duyệt mảng
     * 2. if chuoiTimKiem có tồn tại trong mảng
     * 3. mangTimKiem.push nhân viên tìm thấy
     * 4. trả về mangTimKiem
     */
    var mangTimKiem = [];
    this.mangNhanVien.map(function(item) {
        //Thay 3 dấu bằng bằng bằng là indexOf của js
        if(item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
            mangTimKiem.push(item);    
        }
        
    });
    return mangTimKiem;
    

};

