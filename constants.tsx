
import { Service, City } from './types';

export const SERVICES: Service[] = [
  {
    id: 'full-escort',
    name: '全程陪诊',
    price: '¥300/2小时',
    priceNum: 300,
    duration: '2小时',
    description: '全程陪同、挂号取号、缴费取药、陪诊报告总结',
    icon: 'volunteer_activism',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeth5zDujJkdYFWm-teZs6jvkSxYxo-I0cXx8-g3nYG6rrTTpyesT673mIK7KDQL63bbJeLa2UKFfODkMhlWJ6XUER-mB41ZO06gCWLuf1wFc-Pc1Tm4McxnoyI_KyH7UAoyXYIyQVEVVA_vwYAIBq10L7yvImg005lqzOyeGDIL6tlvDsyVdSVU-ukF-pNbiRZ7f13Ac32ccAmukPPJRAbQhbnm76Mml7DeRvMztjd0qsQdCBFSRZZJzErjktHBOS6nwy8QR-rDkj'
  },
  {
    id: 'night-escort',
    name: '夜间陪诊',
    price: '¥400/4小时',
    priceNum: 400,
    duration: '4小时',
    description: '夜间急诊、全程陪同',
    icon: 'dark_mode',
    image: 'https://picsum.photos/seed/night/800/400'
  },
  {
    id: 'agent-service',
    name: '代办服务',
    price: '99元/次',
    priceNum: 99,
    duration: '次',
    description: '代问诊、代跑腿、手续代办等各项医疗辅助服务',
    icon: 'assignment_add',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArNRzUI_2hGDnNYw7z2HMF54i8sviLt6yIV488HAk_APJ6X7DWIHCTfwMCTO7dHm5HvMVJbpS4kMRW-bLBdmp-N9varU6uBun5o77IDXRV3SAemqbHXRSr29MuWHNBW2GyGnQFXu53U1akRm3pfabBGHGKYL2kjydX2DZdwON81EHQbL9uS8wRLG2iJeRnYwhVT49wHg4ANmSvc1HqVYNTGrwZadwLeoyVbgx60mz85-vittGykVr-JPtlIoiotrrO3ym17JFhFZSe'
  }
];

export const CITIES: City[] = [
  { name: '北京市', status: 'opened' },
  { name: '上海市', status: 'opened' },
  { name: '广州市', status: 'opened' },
  { name: '深圳市', status: 'opened' },
  { name: '杭州市', status: 'opened' },
  { name: '成都市', status: 'opened' },
  { name: '南京市', status: 'unopened' },
  { name: '苏州市', status: 'unopened' },
  { name: '武汉市', status: 'unopened' },
  { name: '西安市', status: 'unopened' },
];
