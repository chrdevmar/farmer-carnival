import jwt from 'jsonwebtoken';

export default function validateSession(){
  console.log('validating session');
  const token = window.localStorage.getItem('farmerToken');
  if(!token){
    return {
      isValid: false,
      reason: 'no token exists'
    }
  }
  try {
    const balanceData = jwt.verify(token, 'farmercarnival')
    if(Number(balanceData.balance) < 1){
      return {
        isValid: false,
        reason: 'no balance'
      }
    }
    return {
      isValid: true,
      balance: balanceData
    }
  } catch (err) {
    return {
      isValid: false,
      reason: err.message
    }
  }
}
