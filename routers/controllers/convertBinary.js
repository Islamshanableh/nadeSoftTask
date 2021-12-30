
// this function to convert binary to text 
// 1- i convert binary to decimal using parseInt
// 2- then convert decimal to char using fromCharCode
// 3 - i see the url that is reversed so i reverse again the url

const convert = (binary)=>{
    let newBinary = binary.split(" ");
    let url = ""
    newBinary.forEach(element => {
        url = url + String.fromCharCode(parseInt(element,2))
    });
    return url.split("").reverse().join("")

}