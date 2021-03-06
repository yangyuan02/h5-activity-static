import request from '@/widget/request'

export const getWalletInfo = (data) => request('/api/my/wallet/YBalance', data)

export const createPay = (data) => request('/opay-web/createPay.do', data)

export const getRechargeList = (data) => request('/ouser-center/ucard/queryUCardActivityList.do', data)
