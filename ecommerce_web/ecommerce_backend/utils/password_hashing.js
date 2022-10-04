
import bcrypt from "bcrypt";
export const encryptPassword=async(password)=>{
   const salt= await bcrypt.genSalt(11);
   const hash= await bcrypt.hash(password,salt);
   return hash;
    // console.log("salt:",salt);
    // console.log("hash:",hash);
}
export const decryptPassword=async(pwd,hash)=>{
    const password= bcrypt.compare(pwd,hash);
    return password;
}

