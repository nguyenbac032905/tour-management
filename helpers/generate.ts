
export const generateOrderCode = (number: number): string => {
    const code = `OD${String(number).padStart(8,"0")}`;

    //Hàm String(number) sẽ chuyển số sang chuỗi xong dùng hàm padStart(độ dài chuỗi, kí tự thêm vào đầu nếu không đủ)
    return code;
};

export const generateTourCode = (number: number): string => {
    const code = `TOUR${String(number).padStart(8,"0")}`;
    return code;
};