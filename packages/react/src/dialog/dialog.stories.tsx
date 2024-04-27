import React from 'react';
import { Button } from '../button';
import { Icon } from '../icon';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogRoot,
  DialogRootMethods,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
} from './';

const meta = {
  title: 'Components/Dialog',
};

export default meta;

const plane_svg = (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={250}
    height={250}
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M200.5 484.7H77.4l-0.9-168h43.8z" fill="#FFEB4D"></path>
      <path
        d="M897 652.7H245.5c-92.8 0-168-75.2-168-168h725.6c93.4 0 146.4 51.7 146.4 115.4 0 29-23.5 52.6-52.5 52.6z"
        fill="#DAE5FF"
      ></path>
      <path
        d="M124.4 600.7c30.6 31.8 73.5 51.6 121.2 51.6H897c28.7 0 52-23 52.5-51.6H124.4z"
        fill="#FFACC2"
      ></path>
      <path d="M776.5 513.7h32v42h-32z" fill="#FFFFFF"></path>
      <path
        d="M808.5 562.7h-32c-4.4 0-8-3.1-8-7v-42c0-3.9 3.6-7 8-7h32c4.4 0 8 3.1 8 7v42c0 3.8-3.5 7-8 7z m-24-14h16v-28h-16v28z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M214.5 555.7h-20c-3.3 0-6-2.7-6-6v-30c0-3.3 2.7-6 6-6h20c3.3 0 6 2.7 6 6v30c0 3.3-2.6 6-6 6z"
        fill="#FFFFFF"
      ></path>
      <path
        d="M214.5 562.7h-20c-7.7 0-14-5.5-14-12.2V519c0-6.8 6.3-12.2 14-12.2h20c7.7 0 14 5.5 14 12.2v31.5c0 6.7-6.2 12.2-14 12.2z m-18-14h16v-28h-16v28zM731.5 521.7h-4c-3.3 0-6 2.7-6 6v8c0 3.3 2.7 6 6 6h4c3.3 0 6-2.7 6-6v-8c0-3.3-2.6-6-6-6zM700.5 521.7h-4c-3.3 0-6 2.2-6 5v10c0 2.8 2.7 5 6 5h4c3.3 0 6-2.2 6-5v-10c0-2.8-2.6-5-6-5zM669.5 521.7h-4c-3.3 0-6 2.2-6 5v10c0 2.8 2.7 5 6 5h4c3.3 0 6-2.2 6-5v-10c0-2.8-2.6-5-6-5zM638.5 521.7h-4c-3.3 0-6 2.2-6 5v10c0 2.8 2.7 5 6 5h4c3.3 0 6-2.2 6-5v-10c0-2.8-2.6-5-6-5zM607.5 521.7h-4c-3.3 0-6 2.2-6 5v10c0 2.8 2.7 5 6 5h4c3.3 0 6-2.2 6-5v-10c0-2.8-2.6-5-6-5zM577.5 521.7h-4c-3.3 0-6 2.2-6 5v10c0 2.8 2.7 5 6 5h4c3.3 0 6-2.2 6-5v-10c0-2.8-2.6-5-6-5zM546.5 521.7h-4c-3.3 0-6 2.2-6 5v10c0 2.8 2.7 5 6 5h4c3.3 0 6-2.2 6-5v-10c0-2.8-2.6-5-6-5zM515.5 521.7h-4c-3.3 0-6 2.2-6 5v10c0 2.8 2.7 5 6 5h4c3.3 0 6-2.2 6-5v-10c0-2.8-2.6-5-6-5zM298.5 521.7h-4c-3.3 0-6 2.2-6 5v10c0 2.8 2.7 5 6 5h4c3.3 0 6-2.2 6-5v-10c0-2.8-2.6-5-6-5zM267.5 521.7h-4c-3.3 0-6 2.7-6 6v8c0 3.3 2.7 6 6 6h4c3.3 0 6-2.7 6-6v-8c0-3.3-2.6-6-6-6z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M950.5 821.7c-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2s-7.5 3-12.7 10.2c-5.1 7.2-12 17-25.7 17-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2s-7.5 3-12.7 10.2c-5.1 7.2-12 17-25.7 17-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2-4.4 0-8-3.6-8-8s3.6-8 8-8c13.8 0 20.7 9.8 25.7 17 5.1 7.3 7.7 10.2 12.7 10.2 5 0 7.5-3 12.7-10.2 5.1-7.2 12-17 25.7-17s20.7 9.8 25.7 17c5.1 7.3 7.7 10.2 12.7 10.2 5 0 7.5-3 12.7-10.2 5.1-7.2 12-17 25.7-17s20.7 9.8 25.7 17c5.1 7.3 7.7 10.2 12.7 10.2 4.4 0 8 3.6 8 8s-3.5 8-8 8zM950.5 771.7c-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2s-7.5 3-12.7 10.2c-5.1 7.2-12 17-25.7 17-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2s-7.5 3-12.7 10.2c-5.1 7.2-12 17-25.7 17-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2-4.4 0-8-3.6-8-8s3.6-8 8-8c13.8 0 20.7 9.8 25.7 17 5.1 7.3 7.7 10.2 12.7 10.2 5 0 7.5-3 12.7-10.2 5.1-7.2 12-17 25.7-17s20.7 9.8 25.7 17c5.1 7.3 7.7 10.2 12.7 10.2 5 0 7.5-3 12.7-10.2 5.1-7.2 12-17 25.7-17s20.7 9.8 25.7 17c5.1 7.3 7.7 10.2 12.7 10.2 4.4 0 8 3.6 8 8s-3.5 8-8 8zM241.6 259.6c-12.9 0-19.2-10.1-23.8-17.4-4.3-6.9-6.5-9.9-10.2-9.9s-5.9 3-10.2 9.9c-4.6 7.3-10.9 17.4-23.8 17.4s-19.2-10.1-23.8-17.4c-4.3-6.9-6.5-9.9-10.2-9.9s-5.9 3-10.2 9.9c-4.6 7.3-10.9 17.4-23.8 17.4s-19.2-10.1-23.8-17.4c-4.3-6.9-6.5-9.9-10.2-9.9-4.4 0-8-3.6-8-8s3.6-8 8-8c12.9 0 19.2 10.1 23.8 17.4 4.3 6.9 6.5 9.9 10.2 9.9s5.9-3 10.2-9.9c4.6-7.3 10.9-17.4 23.8-17.4s19.2 10.1 23.8 17.4c4.3 6.9 6.5 9.9 10.2 9.9 3.7 0 5.9-3 10.2-9.9 4.6-7.3 10.9-17.4 23.8-17.4s19.2 10.1 23.8 17.4c4.3 6.9 6.5 9.9 10.2 9.9 4.4 0 8 3.6 8 8s-3.6 8-8 8zM263.5 209.6c-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2-5 0-7.5 3-12.7 10.2-5.1 7.2-12 17-25.7 17-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2s-7.5 3-12.7 10.2c-5.1 7.2-12 17-25.7 17-13.8 0-20.7-9.8-25.7-17-5.1-7.3-7.7-10.2-12.7-10.2-4.4 0-8-3.6-8-8s3.6-8 8-8c13.8 0 20.7 9.8 25.7 17 5.1 7.3 7.7 10.2 12.7 10.2 5 0 7.5-3 12.7-10.2 5.1-7.2 12-17 25.7-17s20.7 9.8 25.7 17c5.1 7.3 7.7 10.2 12.7 10.2 5 0 7.5-3 12.7-10.2 5.1-7.2 12-17 25.7-17s20.7 9.8 25.7 17c5.1 7.3 7.7 10.2 12.7 10.2 4.4 0 8 3.6 8 8s-3.5 8-8 8z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M350.1 82m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill="#FFEB4D"
      ></path>
      <path
        d="M350.1 122c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z m0-64c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.7-24-24-24zM926.5 957.7h-824c-4.4 0-8-3.6-8-8s3.6-8 8-8h824c4.4 0 8 3.6 8 8s-3.5 8-8 8z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M233 492.7c4 9.7 20 21.4 47.5 19.2 65.5-5.2 131.9-13.6 204-9.2 136.5 8.2 231.1 1.5 272.6-2 15.8-1.3 48.4-3.5 62.9-7.4-5.5-0.4-11.1-0.6-16.9-0.6H233z"
        fill="#FFFFFF"
      ></path>
      <path d="M656.3 652.2H456.4l-194.1-203h56.3z" fill="#FFACC2"></path>
      <path
        d="M701.3 684.7h-70c-8.8 0-16-7.2-16-16v-28c0-8.8 7.2-16 16-16h70c8.8 0 16 7.2 16 16v28c0 8.8-7.2 16-16 16z"
        fill="#CAE8FF"
      ></path>
      <path
        d="M916.5 512.4c-27.9-23.3-67.1-35.7-113.4-35.7H379.9l-57.1-34.4c-1.2-0.7-2.7-1.1-4.1-1.1h-56.3c-3.2 0-6.1 1.9-7.4 4.9-1.3 2.9-0.6 6.4 1.6 8.7l21 22h-72.2l-78-163.8c-1.4-2.6-4.1-4.2-7-4.2H76.5c-2.1 0-4.2 0.8-5.7 2.4-1.5 1.5-2.3 3.6-2.3 5.7l0.9 168c0 0.4 0 0.8 0.1 1.2 0.7 96.5 79.4 174.8 176 174.8h361.8v8c0 13.2 10.8 24 24 24h70c13.2 0 24-10.8 24-24v-8H897c33.4 0 60.6-27.2 60.6-60.6-0.1-34.6-14.6-65.8-41.1-87.9z m-113.4-19.7c42.5 0 78.2 11 103.1 31.9 20.9 17.5 33.1 41.4 35 68.1H572.8l-85.7-51.5c2-0.8 3.4-2.5 3.4-4.5v-10c0-2.8-2.7-5-6-5h-4c-3.3 0-6 2.2-6 5v6.9l-68-40.9h396.6z m-718.5-168h31l71.6 152H85.4l-0.8-152z m1.1 168H292.8l28.9 30.2c-1.3 0.9-2.1 2.3-2.1 3.8v10c0 2.8 2.7 5 6 5h4c3.1 0 5.6-1.9 5.9-4.4l53 55.4H127.6c-24.4-26.7-40-61.6-41.9-100z m222.6 151.6h-62.8c-37.2 0-72.3-12.5-100.7-35.6h258.8l34.2 35.7-129.5-0.1z m299-3.6v3.5H459.8L281 457.2h35.4l292.2 175.7c-0.8 2.4-1.3 5-1.3 7.8z m102 28c0 4.4-3.6 8-8 8h-70c-4.4 0-8-3.6-8-8v-28c0-4.4 3.6-8 8-8h70c4.4 0 8 3.6 8 8v28zM897 644.3l-171.7 0.4v-4c0-13.2-10.8-24-24-24h-70c-4.6 0-8.9 1.3-12.6 3.6l-19.3-11.6h341.1c-4.1 20.2-22.2 35.6-43.5 35.6z"
        fill="#9A2D2F"
      ></path>
    </g>
  </svg>
);

const car_svg = (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    width={200}
    height={200}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M894.4 812.1h-788.2c-17.1 0-30.9-14.3-30.9-32v-208H772c76 0 139.6 59.8 146.9 138.1l6.5 69.9c-0.1 17.6-13.9 32-31 32zM695.3 572h-620l52.9-163.8c4.3-13.2 16.6-22.2 30.5-22.2h444.5c13.3 0 25.3 8.3 29.9 20.7l62.2 165.3z"
        fill="#F2E779"
      ></path>
      <path
        d="M953.3 812.1l-7.2-57.7c-4-32.1-31.3-56.3-63.5-56.3H767.2c-26.5 0-50.6 16.8-59.9 41.7l-27 72.3h273z"
        fill="#F9EBCD"
      ></path>
      <path
        d="M920.3 812.1h-206l22.2-59.2c4.7-12.5 16.6-20.8 30-20.8h115.6c16.1 0 29.8 12 31.8 28l6.4 52z"
        fill="#F4CD9D"
      ></path>
      <path
        d="M920.3 820.1h-206c-2.6 0-5.1-1.3-6.6-3.4-1.5-2.2-1.8-4.9-0.9-7.4L729 750c5.8-15.5 20.9-26 37.5-26h115.6c20.1 0 37.2 15.1 39.7 35l6.5 52c0.3 2.3-0.4 4.6-1.9 6.3-1.6 1.8-3.8 2.8-6.1 2.8z m-194.5-16h185.4l-5.4-43c-1.5-12-11.7-21-23.8-21H766.5c-9.9 0-19 6.3-22.5 15.6l-18.2 48.4z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M817.3 841.1m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z"
        fill="#DAE5FF"
      ></path>
      <path
        d="M124.3 812.1l7.2-57.7c4-32.1 31.3-56.3 63.5-56.3h115.5c26.5 0 50.6 16.8 59.9 41.7l27 72.3h-273.1z"
        fill="#F9EBCD"
      ></path>
      <path
        d="M157.3 812.1h206l-22.2-59.2c-4.7-12.5-16.6-20.8-30-20.8h-115.5c-16.1 0-29.8 12-31.8 28l-6.5 52z"
        fill="#F4CD9D"
      ></path>
      <path
        d="M363.3 820.1h-206c-2.3 0-4.5-1-6-2.7-1.5-1.7-2.2-4-1.9-6.3l6.5-52c2.5-20 19.6-35 39.7-35h115.6c16.6 0 31.6 10.4 37.5 26l22.2 59.2c0.9 2.5 0.6 5.2-0.9 7.4-1.6 2.1-4.1 3.4-6.7 3.4z m-196.9-16h185.4l-18.2-48.4c-3.5-9.3-12.5-15.6-22.5-15.6h-115.5c-12.1 0-22.3 9-23.8 21l-5.4 43z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M260.3 841.1m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z"
        fill="#DAE5FF"
      ></path>
      <path
        d="M796.2 641.1h-649.9c-4.4 0-8-3.6-8-8s3.6-8 8-8h649.8c4.4 0 8 3.6 8 8s-3.5 8-7.9 8z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M874.8 617.1h-22.5c-8.8 0-16 7.2-16 16s7.2 16 16 16h46.9c-6.7-11.8-14.9-22.5-24.4-32z"
        fill="#FFF5DC"
      ></path>
      <path
        d="M364.3 536.1h-210c-11 0-18.7-10.8-15.2-21.1l25.5-75.1c4.4-13 16.6-21.7 30.3-21.7h169.3c8.8 0 16 7.2 16 16v86c0.1 8.7-7.1 15.9-15.9 15.9z"
        fill="#DAE5FF"
      ></path>
      <path
        d="M364.3 544.1h-210c-7.7 0-15-3.7-19.5-10-4.6-6.4-5.7-14.3-3.2-21.7l25.5-75.1c5.5-16.2 20.8-27.2 37.9-27.2h169.3c13.2 0 24 10.8 24 24v86c0 13.2-10.8 24-24 24z m-169.3-118c-10.3 0-19.5 6.5-22.8 16.3l-25.5 75.1c-0.8 2.5-0.4 5.1 1.1 7.2 1.5 2.1 3.9 3.3 6.5 3.3h209.9c4.4 0 8-3.6 8-8v-86c0-4.4-3.6-8-8-8l-169.2 0.1z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M610.3 536.1h-159c-8.9 0-16-7.2-16-16v-86c0-8.8 7.2-16 16-16h118.2c13.7 0 25.9 8.7 30.4 21.7l25.5 75.1c3.6 10.4-4.2 21.2-15.1 21.2z"
        fill="#DAE5FF"
      ></path>
      <path
        d="M610.3 544.1h-159c-13.2 0-24-10.8-24-24v-86c0-13.2 10.8-24 24-24h118.2c17.2 0 32.4 10.9 37.9 27.2l25.5 75.1c2.5 7.4 1.3 15.3-3.2 21.7-4.4 6.2-11.7 10-19.4 10z m-159-118c-4.4 0-8 3.6-8 8v86c0 4.4 3.6 8 8 8h158.9c2.6 0 5-1.2 6.5-3.4 1.5-2.1 1.9-4.7 1.1-7.2l-25.5-75.1c-3.3-9.7-12.5-16.3-22.8-16.3H451.3z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M261.3 842.1m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z"
        fill="#FFFFFF"
      ></path>
      <path
        d="M261.3 900.1c-32 0-58-26-58-58s26-58 58-58 58 26 58 58-26 58-58 58z m0-100c-23.2 0-42 18.8-42 42s18.8 42 42 42 42-18.8 42-42-18.8-42-42-42z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M817.3 842.1m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z"
        fill="#FFFFFF"
      ></path>
      <path
        d="M817.3 900.1c-32 0-58-26-58-58s26-58 58-58 58 26 58 58-26 58-58 58z m0-100c-23.2 0-42 18.8-42 42s18.8 42 42 42 42-18.8 42-42-18.8-42-42-42zM76.3 212.9c5 0 7.5 3 12.7 10.2 5.1 7.2 12 17 25.7 17s20.7-9.8 25.7-17c5.1-7.3 7.7-10.2 12.7-10.2s7.5 3 12.7 10.2c5.1 7.2 12 17 25.7 17 13.8 0 20.7-9.8 25.7-17 5.1-7.3 7.7-10.2 12.7-10.2s7.5 3 12.7 10.2c5.1 7.2 12 17 25.7 17 4.4 0 8-3.6 8-8s-3.6-8-8-8c-5 0-7.5-3-12.7-10.2-5.1-7.2-12-17-25.7-17s-20.7 9.8-25.7 17c-5.1 7.3-7.7 10.2-12.7 10.2s-7.5-3-12.7-10.2c-5.1-7.2-12-17-25.7-17s-20.7 9.8-25.7 17c-5.1 7.3-7.7 10.2-12.7 10.2s-7.5-3-12.7-10.2c-5.1-7.2-12-17-25.7-17-4.4 0-8 3.6-8 8s3.6 8 8 8zM76.3 262.9c5 0 7.5 3 12.7 10.2 5.1 7.2 12 17 25.7 17s20.7-9.8 25.7-17c5.1-7.3 7.7-10.2 12.7-10.2s7.5 3 12.7 10.2c5.1 7.2 12 17 25.7 17 13.8 0 20.7-9.8 25.7-17 5.1-7.3 7.7-10.2 12.7-10.2s7.5 3 12.7 10.2c5.1 7.2 12 17 25.7 17 4.4 0 8-3.6 8-8s-3.6-8-8-8c-5 0-7.5-3-12.7-10.2-5.1-7.2-12-17-25.7-17s-20.7 9.8-25.7 17c-5.1 7.3-7.7 10.2-12.7 10.2s-7.5-3-12.7-10.2c-5.1-7.2-12-17-25.7-17s-20.7 9.8-25.7 17c-5.1 7.3-7.7 10.2-12.7 10.2s-7.5-3-12.7-10.2c-5.1-7.2-12-17-25.7-17-4.4 0-8 3.6-8 8 0 4.5 3.6 8 8 8zM758.3 468.4c5 0 7.5 3 12.7 10.2 5.1 7.2 12 17 25.7 17s20.7-9.8 25.7-17c5.1-7.3 7.7-10.2 12.7-10.2s7.5 3 12.7 10.2c5.1 7.2 12 17 25.7 17 13.8 0 20.7-9.8 25.7-17 5.1-7.3 7.7-10.2 12.7-10.2s7.5 3 12.7 10.2c5.1 7.2 12 17 25.7 17 4.4 0 8-3.6 8-8s-3.6-8-8-8c-5 0-7.5-3-12.7-10.2-5.1-7.2-12-17-25.7-17s-20.7 9.8-25.7 17c-5.1 7.3-7.7 10.2-12.7 10.2s-7.5-3-12.7-10.2c-5.1-7.2-12-17-25.7-17s-20.7 9.8-25.7 17c-5.1 7.3-7.7 10.2-12.7 10.2s-7.5-3-12.7-10.2c-5.1-7.2-12-17-25.7-17-4.4 0-8 3.6-8 8s3.6 8 8 8zM758.3 518.4c5 0 7.5 3 12.7 10.2 5.1 7.2 12 17 25.7 17s20.7-9.8 25.7-17c5.1-7.3 7.7-10.2 12.7-10.2s7.5 3 12.7 10.2c5.1 7.2 12 17 25.7 17 13.8 0 20.7-9.8 25.7-17 5.1-7.3 7.7-10.2 12.7-10.2s7.5 3 12.7 10.2c5.1 7.2 12 17 25.7 17 4.4 0 8-3.6 8-8s-3.6-8-8-8c-5 0-7.5-3-12.7-10.2-5.1-7.2-12-17-25.7-17s-20.7 9.8-25.7 17c-5.1 7.3-7.7 10.2-12.7 10.2s-7.5-3-12.7-10.2c-5.1-7.2-12-17-25.7-17s-20.7 9.8-25.7 17c-5.1 7.3-7.7 10.2-12.7 10.2s-7.5-3-12.7-10.2c-5.1-7.2-12-17-25.7-17-4.4 0-8 3.6-8 8s3.6 8 8 8z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M349.1 104.1m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill="#FFEB4D"
      ></path>
      <path
        d="M349.1 144.1c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-18 40-40 40z m0-64c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.8-24-24-24z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M961.2 811.1l-7.2-57.7c-2.5-19.9-12.9-37-27.8-48.4-4.6-38.1-22.1-73.1-49.7-99-28.7-27-65.9-41.9-104.7-41.9h-71.1L640.4 404c-5.8-15.5-20.9-25.9-37.4-25.9h-444.4c-17.4 0-32.7 11.1-38.1 27.7l-52.8 163.8c-0.2 0.5-0.2 0.9-0.3 1.4v209c0 22.1 17.5 40 38.9 40h68.6c-1.7 6.7-2.5 13.8-2.5 21 0 30.4 15.5 57.2 38.9 73h-108c-4.4 0-8 3.6-8 8s3.6 8 8 8h824c4.4 0 8-3.6 8-8s-3.6-8-8-8h-60.9c23.5-15.8 38.9-42.6 38.9-73 0-7.2-0.9-14.3-2.5-21h50.5c2.3 0 4.5-1 6-2.7s2.2-3.9 1.9-6.2z m-76.6-170h-32.3c-4.4 0-8-3.6-8-8s3.6-8 8-8h19.1c4.8 5 9.2 10.3 13.2 16z m-748.8-230.5c3.2-9.9 12.4-16.6 22.8-16.6h444.5c9.9 0 19 6.2 22.5 15.5l58.1 154.5h-597.4l49.5-153.4z m-12.2 342.8l-6.3 50.7h-11c-12.6 0-22.9-10.8-22.9-24v-200H772c30.4 0 59.7 10.2 83.8 29h-3.4c-13.2 0-24 10.8-24 24s10.8 24 24 24h43c6.1 11.9 10.5 24.6 13.2 37.8-8-3.1-16.8-4.8-25.8-4.8H767.2c-29.8 0-56.9 18.9-67.4 46.9l-25 67.1H402.9l-25-67.1c-10.5-28.1-37.6-46.9-67.4-46.9H195c-36.3 0-67 27.2-71.4 63.3z m9.8 50.7l6.1-48.7c3.5-28.1 27.4-49.3 55.5-49.3h115.5c23.2 0 44.2 14.7 52.4 36.5l22.9 61.5h-45.6c-14-30.1-44.5-51-79.8-51s-65.8 20.9-79.8 51h-47.2z m54.9 37c0-39.7 32.3-72 72-72s72 32.3 72 72-32.3 72-72 72-72-32.3-72-72z m121.1 73c23.5-15.8 38.9-42.6 38.9-73 0-7.2-0.9-14.3-2.5-21h386c-1.7 6.7-2.5 13.8-2.5 21 0 30.4 15.5 57.2 38.9 73H309.4z m507.9-1c-39.7 0-72-32.3-72-72s32.3-72 72-72 72 32.3 72 72-32.3 72-72 72z m79.8-109c-14-30.1-44.5-51-79.8-51s-65.8 20.9-79.8 51h-45.6l22.9-61.5c8.1-21.8 29.2-36.5 52.4-36.5h115.5c10.3 0 20.7 2 28.5 7.9 4.8 3.6 12.7 8.9 17.6 16.5 4.7 7.4 8.3 15.7 9.5 24.9l6.1 48.7h-47.3z"
        fill="#9A2D2F"
      ></path>
      <path
        d="M601.4 425.8c9.6 0.5 19.9 0.9 30.7 1.2l-6.5-17.4c-3.5-9.3-12.5-15.5-22.5-15.5h-444.5c-6.1 0-11.8 2.3-16.1 6.2 3.8 8 11.9 15.5 23.9 21.9 7.4-7.5 17.6-12 28.6-12h169.3c8.3 0 15.6 4.2 19.9 10.6 20-5.8 35.5-11.2 51.1-13.6 13.6-2 27.8-0.2 46.2 3h88a39.7 39.7 0 0 1 31.9 15.6zM272.8 439.1c39.2-2 68.2-7.2 91.4-13H195c-4.2 0-8.3 1.1-11.8 3.1 22.2 7.5 52.5 11.7 89.6 9.9z"
        fill="#FFFFFF"
      ></path>
    </g>
  </svg>
);

const Template = (args) => {
  return (
    <DialogRoot defaultOpen={args.defaultOpen} keepMounted={args.keepMounted}>
      <DialogTrigger>
        <Button>{args.trigger}</Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent className={args.className}>
          <DialogTitle>SVG Vector</DialogTitle>

          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            ducimus atque aut amet odio ex at rem alias nemo recusandae
          </DialogDescription>

          <div className="my-4 flex justify-center">{args.svg}</div>

          <div className="pt-1 flex gap-2">
            <div className="grow">{args.children}</div>

            <DialogClose>
              <Button variant="text" color="danger">
                Close
              </Button>
            </DialogClose>

            <Button color="success">GREAT</Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

const DialogTemplate = (args) => {
  return (
    <>
      <Template {...args} trigger="Check plane" svg={plane_svg} />

      {Array.from({ length: 10 }).map((_, i) => (
        <p className="m-3" key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quam
          fuga voluptatem fugiat? Ullam voluptate saepe illo quidem excepturi
          recusandae perspiciatis nemo cumque incidunt deleniti corrupti quam
          similique beatae unde doloremque quod id aut, pariatur blanditiis iste
          repellendus a ea? Repellat quod quo unde ipsam atque molestiae,
          voluptas accusamus ex sit sapiente placeat. Iusto quasi sunt ad autem
          quos laborum facilis illum obcaecati reiciendis tempora quidem vitae
          at voluptatibus, recusandae dicta necessitatibus itaque rerum.
          Possimus et officiis similique enim cumque ex a voluptas ipsam? Minus
          vel quaerat, sequi labore at necessitatibus suscipit eum ducimus error
          eaque explicabo qui iure ipsa magnam facilis illum libero rem non
          pariatur? Perferendis ducimus ipsum dolor inventore
        </p>
      ))}
    </>
  );
};

export const Default = {
  render: DialogTemplate,
  args: {
    defaultOpen: true,
    keepMounted: false,
  },
};

const NestedTemplate = (args) => {
  return (
    <>
      <Template {...args} trigger="Check plane" svg={plane_svg}>
        <Template trigger="Check car" svg={car_svg} className="max-w-sm" />
      </Template>

      {Array.from({ length: 10 }).map((_, i) => (
        <p className="m-3" key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quam
          fuga voluptatem fugiat? Ullam voluptate saepe illo quidem excepturi
          recusandae perspiciatis nemo cumque incidunt deleniti corrupti quam
          similique beatae unde doloremque quod id aut, pariatur blanditiis iste
          repellendus a ea? Repellat quod quo unde ipsam atque molestiae,
          voluptas accusamus ex sit sapiente placeat. Iusto quasi sunt ad autem
          quos laborum facilis illum obcaecati reiciendis tempora quidem vitae
          at voluptatibus, recusandae dicta necessitatibus itaque rerum.
          Possimus et officiis similique enim cumque ex a voluptas ipsam? Minus
          vel quaerat, sequi labore at necessitatibus suscipit eum ducimus error
          eaque explicabo qui iure ipsa magnam facilis illum libero rem non
          pariatur? Perferendis ducimus ipsum dolor inventore
        </p>
      ))}
    </>
  );
};

export const Nested = {
  render: NestedTemplate,
  args: {
    defaultOpen: true,
    keepMounted: false,
  },
};

const VirtualElementTemplate = () => {
  const [virtualElement, setVirtualElement] =
    React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button ref={setVirtualElement}>open dialog</Button>

      <DialogRoot defaultOpen>
        <DialogTrigger virtualElement={virtualElement} />

        <DialogPortal>
          <DialogOverlay />

          <DialogContent>
            <DialogTitle>SVG Vector</DialogTitle>

            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              aperiam tenetur numquam sunt, tempore, enim assumenda rem facere
              nesciunt sit, voluptate optio voluptatum vero impedit. Doloremque,
              velit? Enim error voluptas ullam voluptates esse excepturi
              molestias dicta beatae, sed delectus nemo sequi in, minus
              laboriosam expedita, magni asperiores vel. Culpa quia earum iste
              cum ducimus. Minima deserunt debitis dolore ab quo tempore omnis?
              Sapiente quos eos maiores veritatis mollitia officia nobis
              eligendi harum, ipsum vitae. Odit soluta vel delectus magnam ea
              sit quidem vero libero necessitatibus dolores, consequuntur
              voluptate. Quibusdam, magni voluptatibus necessitatibus debitis
              quo natus delectus ut explicabo. Quis, illum.
            </DialogDescription>

            <div className="pt-1 flex gap-2">
              <div className="grow" />

              <DialogClose>
                <Button variant="text" color="danger">
                  Close
                </Button>
              </DialogClose>

              <Button color="success">GREAT</Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  );
};

export const VirtualElement = {
  render: VirtualElementTemplate,
};

const ProgrammaticallyTemplate = () => {
  const [virtualElement, setVirtualElement] =
    React.useState<HTMLButtonElement | null>(null);

  const ref = React.useRef<DialogRootMethods>(null);

  return (
    <>
      <Button ref={setVirtualElement}>open dialog</Button>

      <DialogRoot ref={ref} defaultOpen>
        <DialogTrigger virtual virtualElement={virtualElement} />

        <DialogPortal>
          <DialogOverlay />

          <DialogContent>
            <Button
              isIconOnly
              aria-label="close"
              size="sm"
              color="danger"
              variant="text"
              className="w-5 h-5 absolute right-2 top-2"
              classNames={{ content: 'text-xs' }}
              onPress={() => ref.current?.onClose('pointer')}
            >
              <Icon>
                <svg fill="none" viewBox="0 0 24 24">
                  <g>
                    <g>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
                      ></path>
                    </g>
                  </g>
                </svg>
              </Icon>
            </Button>

            <DialogTitle>SVG Vector</DialogTitle>

            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae quam voluptas, aliquam repellat sed vel odio,
              similique eos nemo nobis deserunt totam facere placeat eligendi
              inventore, nesciunt impedit vero suscipit doloribus debitis beatae
              molestias. Ad voluptate vel pariatur error quia. Reiciendis,
              nesciunt at? Vel corporis neque asperiores quos impedit expedita,
              minima explicabo vero facilis numquam reprehenderit sit laudantium
              quis qui excepturi autem laborum, facere non, aspernatur in
              voluptatem quam nesciunt eos. Quo nisi officiis consectetur saepe
              harum nam voluptatibus et tenetur, deserunt illo cumque placeat
              quas quis fugit? Magnam ea praesentium a assumenda dicta earum
              eius tempora laborum. Illum, in.
            </DialogDescription>

            <div className="pt-1 flex gap-2">
              <div className="grow" />

              <DialogClose>
                <Button variant="text" color="danger">
                  Close
                </Button>
              </DialogClose>

              <Button color="success">GREAT</Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  );
};

export const Programmatically = {
  render: ProgrammaticallyTemplate,
};
