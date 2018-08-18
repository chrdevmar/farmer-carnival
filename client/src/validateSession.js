import jwt from 'jsonwebtoken';

export default function(){
  console.log('validating session');
  const token = window.localStorage.getItem('farmerToken');
  if(!token){
    return {
      isValid: false
    }
  }
  try {
    const balanceData = jwt.verify(token)
    if()
  }
}
