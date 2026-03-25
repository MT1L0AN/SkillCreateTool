// ============== Ant Design SVG Icons ==============
const IC = {
  // Navigation & Actions
  puzzle:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/><path d="M380.4 475.2c0-24.3 17.6-44 39.3-44h184.6c21.7 0 39.3 19.7 39.3 44v73.6c0 24.3-17.6 44-39.3 44H419.7c-21.7 0-39.3-19.7-39.3-44v-73.6z"/></svg>',
  code:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1z"/><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/></svg>',
  laptop:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M956.9 845.1l-27.6-227.4-18.5-152.7a64 64 0 0 0-63.5-56H176.7a64 64 0 0 0-63.5 56L94.7 617.7 67.1 845.1c-1.9 16 10 30.3 26.1 31.1h837.6c16.1-0.8 28-15.1 26.1-31.1zM184 552h656l17.3 142.5H166.7L184 552zm-14.7 208.5h685.4L872 845H152l17.3-84.5zM880 112H144c-17.7 0-32 14.3-32 32v360c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V184h656v320c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V144c0-17.7-14.3-32-32-32z"/></svg>',
  shop:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M882 272.1V144c0-17.7-14.3-32-32-32H174c-17.7 0-32 14.3-32 32v128.1c-16.7 1-30 14.9-30 31.9v131.7a177 177 0 0 0 14.4 70.4c4.3 10.2 9.6 19.8 15.6 28.8V704c0 17.7 14.3 32 32 32h274V512h176v224h274c17.7 0 32-14.3 32-32V536.1c6-9 11.3-18.6 15.6-28.8 9.4-22.2 14.4-46.1 14.4-70.4V305c0-17-13.3-30.9-30-31.9zM214 184h596v88H214v-88zm362 656H448V546h128v294z"/></svg>',
  folder:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32z"/></svg>',
  folderOpen: '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 0 0-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z"/></svg>',
  file:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"/></svg>',
  fileText:   '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"/><path d="M528 472h-160c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h160c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm192 128H368c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h352c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 128H368c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h352c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"/></svg>',
  fileMd:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"/><path d="M429 586h-66v142h48v-81l27 56h24l27-56v81h48V586h-66l-21 46zm212 0h-48v142h48v-56l64 56h60l-80-70 80-72h-60l-64 56z"/></svg>',
  python:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"/><path d="M398 564h228c17.7 0 32-14.3 32-32V364c0-17.7-14.3-32-32-32H398c-17.7 0-32 14.3-32 32v168c0 17.7 14.3 32 32 32zm20-180h188v148H418V384zm208 280H398c-17.7 0-32 14.3-32 32v168c0 17.7 14.3 32 32 32h228c17.7 0 32-14.3 32-32V696c0-17.7-14.3-32-32-32zm-20 180H418V696h188v148z"/></svg>',
  json:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"/><path d="M398.7 554.3c0 32.4-7 55.6-20.9 69.5-14 14-35.4 20.9-64.3 20.9h-30.8v-48h22.1c14.6 0 25-3.6 31-10.8 6.1-7.2 9.1-19.5 9.1-37v-78.7c0-24.7 5.2-43.2 15.5-55.4 10.4-12.3 27-19.6 49.8-22.1v-4c-22.8-2.5-39.4-9.8-49.8-22.1-10.3-12.2-15.5-30.7-15.5-55.4V232.5c0-17.4-3-29.8-9.1-37-6-7.2-16.4-10.8-31-10.8h-22.1v-48h30.8c28.9 0 50.3 7 64.3 20.9 13.9 13.9 20.9 37.1 20.9 69.5v70.3c0 19.8 3.7 33.8 11.2 41.9 7.4 8.2 20.5 13 39.2 14.6v50.4c-18.7 1.5-31.8 6.4-39.2 14.6-7.5 8.1-11.2 22.1-11.2 41.9v70.3zm226.6 0v-70.3c0-19.8-3.7-33.8-11.2-41.9-7.4-8.2-20.5-13-39.2-14.6V377c18.7-1.5 31.8-6.4 39.2-14.6 7.5-8.1 11.2-22.1 11.2-41.9v-70.3c0-32.4 7-55.6 20.9-69.5 14-14 35.4-20.9 64.3-20.9h30.8v48h-22.1c-14.6 0-25 3.6-31 10.8-6.1 7.2-9.1 19.5-9.1 37v78.7c0 24.7-5.2 43.2-15.5 55.4-10.4 12.3-27 19.6-49.8 22.1v4c22.8 2.5 39.4 9.8 49.8 22.1 10.3 12.2 15.5 30.7 15.5 55.4v78.7c0 17.4 3 29.8 9.1 37 6 7.2 16.4 10.8 31 10.8h22.1v48h-30.8c-28.9 0-50.3-7-64.3-20.9-13.9-13.9-20.9-37.1-20.9-69.5z"/></svg>',
  setting:    '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-0.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-0.5c-52.1-9.4-106.9-9.4-159 0l-2.7 0.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-0.9 2.6c-4.5 12.5-0.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l0.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7 0.5a449.4 449.4 0 0 0 159 0l2.7-0.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l0.9-2.6c4.5-12.3 0.8-26.3-9.3-35zM512 668c-86.1 0-156-69.9-156-156s69.9-156 156-156 156 69.9 156 156-69.9 156-156 156z"/></svg>',
  save:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840z"/><path d="M512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"/></svg>',
  edit:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"/></svg>',
  delete:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"/></svg>',
  plus:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M482 152h60c4.4 0 8 3.6 8 8v704c0 4.4-3.6 8-8 8h-60c-4.4 0-8-3.6-8-8V160c0-4.4 3.6-8 8-8z"/><path d="M176 474h672c4.4 0 8 3.6 8 8v60c0 4.4-3.6 8-8 8H176c-4.4 0-8-3.6-8-8v-60c0-4.4 3.6-8 8-8z"/></svg>',
  star:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 0.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"/></svg>',
  search:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 714 478.4 714 408c0-167.8-136.2-304-304-304S106 240.2 106 408s136.2 304 304 304c70.4 0 134.7-23.8 186.8-64.1l259.7 259.6a8.2 8.2 0 0 0 11.6 0l41.5-41.5a8.2 8.2 0 0 0 0-11.5zM410 676c-147.6 0-268-120.4-268-268s120.4-268 268-268 268 120.4 268 268-120.4 268-268 268z"/></svg>',
  check:      '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1 0.4-12.8-6.3-12.8z"/></svg>',
  checkCircle:'<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/></svg>',
  closeCircle:'<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"/></svg>',
  warning:    '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"/></svg>',
  info:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"/></svg>',
  rocket:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M864 736c0-111.6-65.4-208-160-252.9V317.3c0-15.1-5.3-29.7-15.1-41.2L536.5 95.4C530.1 87.8 521.4 84 512 84s-18.1 3.8-24.5 11.4L335.1 276.1a63.97 63.97 0 0 0-15.1 41.2v165.8C225.4 528 160 624.4 160 736h156.5c-2.3 7.2-3.5 15-3.5 23.8 0 22.1 7.6 43.7 21.4 60.8a97.2 97.2 0 0 0 43.1 30.6c23.1 54 75.6 88.8 134.5 88.8 58.9 0 111.4-34.8 134.5-88.8a97.07 97.07 0 0 0 43.1-30.6 97.07 97.07 0 0 0 21.4-60.8c0-8.8-1.2-16.6-3.5-23.8H864zM512 868c-26.1 0-49.3-15.5-60.3-38.5 6.6 1.2 13.3 2.5 20.3 2.5h80c7 0 13.7-1.3 20.3-2.5-11 23-34.2 38.5-60.3 38.5z"/></svg>',
  box:        '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 520H232V376h128v56c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-56h176v56c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-56h128v440z"/></svg>',
  target:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M952 474H829.8C812.5 327.6 696.4 211.5 550 194.2V72c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v122.2C327.6 211.5 211.5 327.6 194.2 474H72c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h122.2C211.5 696.4 327.6 812.5 474 829.8V952c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V829.8C696.4 812.5 812.5 696.4 829.8 550H952c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM512 756c-134.8 0-244-109.2-244-244s109.2-244 244-244 244 109.2 244 244-109.2 244-244 244z"/><path d="M512 392c-66.2 0-120 53.8-120 120s53.8 120 120 120 120-53.8 120-120-53.8-120-120-120zm0 180c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60z"/></svg>',
  download:   '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2 0.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h660c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"/></svg>',
  arrowLeft:  '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155.7 507.2a16.4 16.4 0 0 0 0 25.6L537.9 880c2.9 2.5 6.6 4 10.5 4h88.5c7.4 0 10.8-9.2 5.2-14L291.9 566H872c4.4 0 8-3.6 8-8v-76c0-4.4-3.6-8-8-8z"/></svg>',
  cloud:      '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3z"/></svg>',
  thunder:    '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M853.333 493.867H573.44L728.747 115.2a10.667 10.667 0 0 0-9.814-14.933H412.587a10.667 10.667 0 0 0-9.814 6.4L199.44 555.733a10.667 10.667 0 0 0 9.813 14.934H450.56L336.107 916.48a10.667 10.667 0 0 0 17.706 10.987l509.44-418.987a10.667 10.667 0 0 0-9.92-14.613z"/></svg>',
  table:      '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 208H676V232h212v136zm0 224H676V456h212v136zM412 432H136V296h276v136zm0 224H136V520h276v136zm200-224H476V296h136v136zm0 224H476V520h136v136zm200 200H136V720h676v136z"/></svg>',
  snippet:    '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M320 232h-48c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V240c0-4.4-3.6-8-8-8zm389.6-17.2c-3-2.6-7.1-3.3-10.8-1.9l-17.4 6.9c-3.5 1.4-5.7 5-5.3 8.7l8.2 67.6-97.3 84.4-52.5-53.8a8.05 8.05 0 0 0-11.4 0l-68.4 70.2-97.3-84.4 8.2-67.6c0.4-3.7-1.8-7.3-5.3-8.7l-17.4-6.9c-3.7-1.4-7.8-0.7-10.8 1.9L217 297.3c-2.4 2-3.7 5-3.7 8.1v440c0 3.1 1.3 6.1 3.7 8.1l130.1 112.8c3 2.6 7.1 3.3 10.8 1.9l17.4-6.9c3.5-1.4 5.7-5 5.3-8.7l-8.2-67.6 97.3-84.4 52.5 53.8c3.1 3.2 8.2 3.2 11.4 0l68.4-70.2 97.3 84.4-8.2 67.6c-0.4 3.7 1.8 7.3 5.3 8.7l17.4 6.9c3.7 1.4 7.8 0.7 10.8-1.9L807 750.5c2.4-2 3.7-5 3.7-8.1v-440c0-3.1-1.3-6.1-3.7-8.1L709.6 214.8z"/></svg>',
  deploy:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M888.3 757.4h-53.8c-4.2 0-7.7 3.5-7.7 7.7v61.8H197.1V197.1h629.8v61.8c0 4.2 3.5 7.7 7.7 7.7h53.8c4.2 0 7.7-3.4 7.7-7.7V158.7c0-17-13.7-30.7-30.7-30.7H158.7c-17 0-30.7 13.7-30.7 30.7v706.6c0 17 13.7 30.7 30.7 30.7h706.6c17 0 30.7-13.7 30.7-30.7V765.1c0-4.3-3.5-7.7-7.7-7.7zM902 476H588v-76c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 0 0 0 12.6l141.9 112c5.3 4.2 13 0.4 13-6.3v-76h314c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"/></svg>',
  layout:     '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 464H528V448h312v128zm0-192H528V232h312v152zM464 232v616H184V232h280z"/></svg>',
  // Theme icons
  moon:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M601.3 94C526.8 83.4 451.1 86.6 378 103.5c-6.9 1.6-8.8 10.5-3.3 15.2 51.8 44.2 89.3 103.4 107.1 170.2 17.7 66.5 15.3 137.1-7 201.1-22.3 64-64.2 119-120.3 157.6-56.2 38.6-122 59.4-189.6 59.7-6.5 0-11.1 6.6-8.3 12.5a448 448 0 0 0 175.2 196.5c73 44.3 156.6 67.7 241.9 67.7 245.3 0 445-199.7 445-445 0-206.4-140.6-380-331.7-444.2z"/></svg>',
  sun:        '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M512 352c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-52.9 0-96-43.1-96-96s43.1-96 96-96 96 43.1 96 96-43.1 96-96 96z"/><path d="M544 168V88c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8zM544 856v80c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-80c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8zM200.4 201.8l-56.6-56.6c-3.1-3.1-8.2-3.1-11.3 0l-33.9 33.9c-3.1 3.1-3.1 8.2 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l33.9-33.9c3.1-3.1 3.1-8.2 0-11.3zM857.5 822.2l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l33.9-33.9c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6c-3.1-3.1-8.2-3.1-11.3 0l-33.9 33.9c-3.1 3.1-3.1 8.2 0 11.3zM168 480H88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM936 480h-80c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"/></svg>',
  crystal:    '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M508 120a392 392 0 1 0 0 784 392 392 0 0 0 0-784zm0 696c-167.8 0-304-136.2-304-304s136.2-304 304-304v608z"/></svg>',
  eye:        '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"/></svg>',
  tree:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M888 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM632 577c0 3.8-3.4 7-7.5 7H399.5c-4.1 0-7.5-3.2-7.5-7v-42c0-3.8 3.4-7 7.5-7h225c4.1 0 7.5 3.2 7.5 7v42z"/></svg>',
  inbox:      '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M885.2 446.3l-0.2-0.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H288c-16.9 0-31.8 11.1-36.8 27.2L139 445.5l-0.2 0.8C129.1 475.2 128 505.7 128 512v0.7c0 0.4 0 0.7 0 1.1v264c0 43 34.4 78.3 76.8 78.3h614.4c42.4 0 76.8-35.3 76.8-78.3v-264c0-0.3 0-0.7 0-1.1v-0.7c0-6.3-1.1-36.8-10.8-65.7zM216.4 476.4l98-248.4h395.2l98 248.4H610.8c-3.5 0-6.6 2.4-7.5 5.8l-16.5 64.7h-149.6l-16.5-64.7c-0.9-3.4-4-5.8-7.5-5.8H216.4z"/></svg>',
  list:       '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"/></svg>',
  close:      '<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H204c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.8 824.9A7.95 7.95 0 0 0 204 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7H820c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/></svg>',
};

// ============== State ==============
const S = {
  skills: [], currentDir: '', currentPage: 'dashboard',
  editingSkill: null, wizardStep: 0,
  wizardData: {}, config: {}, deployTargets: {},
  currentApp: 'codebuddy', currentTheme: 'dark'
};

// ============== API ==============
const api = {
  async get(u) { return (await fetch(u)).json(); },
  async post(u, d) { return (await fetch(u, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) })).json(); },
  async put(u, d) { return (await fetch(u, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) })).json(); },
  async del(u) { return (await fetch(u, { method:'DELETE' })).json(); }
};

// ============== Theme System ==============
const THEMES = {
  dark:   { icon: IC.moon, label: '深邃暗色' },
  light:  { icon: IC.sun, label: '清爽亮色' },
  purple: { icon: IC.crystal, label: '赛博紫' },
  ocean:  { icon: IC.cloud, label: '深海蓝' },
  forest: { icon: IC.tree, label: '森林绿' },
  sunset: { icon: IC.star, label: '暖日落' }
};

function switchTheme(theme) {
  if (!THEMES[theme]) return;
  S.currentTheme = theme;
  document.body.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeIcon').innerHTML = THEMES[theme].icon;
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === theme);
  });
  localStorage.setItem('skill-creator-theme', theme);
  setTimeout(() => document.body.classList.remove('theme-transitioning'), 350);
  closeThemeSwitcher();
}

function toggleThemeSwitcher() {
  const sw = document.getElementById('themeSwitcher');
  const isOpen = sw.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) sw.classList.add('open');
}

function closeThemeSwitcher() {
  document.getElementById('themeSwitcher')?.classList.remove('open');
}

// ============== Directory Switcher ==============
const APP_DIR_INFO = {
  codebuddy: { icon: IC.code, label: 'CodeBuddy' },
  workbuddy: { icon: IC.thunder, label: 'WorkBuddy' },
  claudecode: { icon: IC.laptop, label: 'Claude Code' }
};

function switchAppDir(appId) {
  const target = S.deployTargets[appId];
  if (!target) return;
  S.currentApp = appId;
  S.currentDir = target.userDir;
  document.getElementById('dirSwitcherIcon').innerHTML = APP_DIR_INFO[appId]?.icon || IC.folderOpen;
  document.getElementById('dirSwitcherLabel').textContent = APP_DIR_INFO[appId]?.label || appId;
  document.getElementById('currentDir').textContent = S.currentDir.replace(S.config.homeDir, '~');
  document.querySelectorAll('.dropdown-item[data-app]').forEach(el => {
    el.classList.toggle('active', el.dataset.app === appId);
  });
  localStorage.setItem('skill-creator-app', appId);
  closeDirSwitcher();
  refreshSkills();
  showToast(`已切换到 ${APP_DIR_INFO[appId]?.label || appId} 技能目录`, 'success');
}

function toggleDirSwitcher() {
  const sw = document.getElementById('dirSwitcher');
  const isOpen = sw.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) sw.classList.add('open');
}

function closeDirSwitcher() {
  document.getElementById('dirSwitcher')?.classList.remove('open');
}

function closeAllDropdowns() {
  closeDirSwitcher();
  closeThemeSwitcher();
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dir-switcher') && !e.target.closest('.theme-switcher')) {
    closeAllDropdowns();
  }
});

// ============== Helpers ==============
function showToast(msg, type='info') {
  const c = document.getElementById('toastContainer');
  const icons = {success:IC.checkCircle,error:IC.closeCircle,warning:IC.warning,info:IC.info};
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(100%)'; setTimeout(()=>t.remove(),300); }, 3000);
}

function esc(s) { return s ? s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : ''; }
function fmtSize(b) { if(b<1024)return b+' B'; if(b<1048576)return(b/1024).toFixed(1)+' KB'; return(b/1048576).toFixed(1)+' MB'; }
function fmtDate(d) { if(!d)return'-'; const dt=new Date(d); return dt.toLocaleDateString('zh-CN')+' '+dt.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}); }
function fileIcon(ext) { const m={'.py':IC.python,'.sh':IC.setting,'.js':IC.code,'.md':IC.fileMd,'.json':IC.json,'.yaml':IC.fileText,'.txt':IC.file}; return m[ext]||IC.file; }

function showModal(title, body, onConfirm) {
  const el = document.createElement('div');
  el.className = 'ant-modal-mask';
  el.onclick = e => { if(e.target===el) el.remove(); };
  el.innerHTML = `<div class="ant-modal">
    <div class="ant-modal-header"><h2>${title}</h2><button class="ant-btn-icon ant-btn-sm" onclick="this.closest('.ant-modal-mask').remove()" style="border:none">${IC.close}</button></div>
    <div class="ant-modal-body">${body}</div>
    <div class="ant-modal-footer"><button class="ant-btn" onclick="this.closest('.ant-modal-mask').remove()">取消</button>
    <button class="ant-btn ant-btn-primary" id="modalConfirm">确认</button></div></div>`;
  document.body.appendChild(el);
  if(onConfirm) el.querySelector('#modalConfirm').onclick = async () => { await onConfirm(); el.remove(); };
}

function simpleMd(md) {
  if(!md) return '<p style="color:var(--text-tertiary)">暂无内容</p>';
  let h = esc(md);
  h = h.replace(/^### (.+)$/gm,'<h3>$1</h3>');
  h = h.replace(/^## (.+)$/gm,'<h2>$1</h2>');
  h = h.replace(/^# (.+)$/gm,'<h1>$1</h1>');
  h = h.replace(/```(\w*)\n([\s\S]*?)```/g,'<pre><code>$2</code></pre>');
  h = h.replace(/`([^`]+)`/g,'<code>$1</code>');
  h = h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" style="color:var(--accent)">$1</a>');
  h = h.replace(/^- (.+)$/gm,'<li>$1</li>');
  h = h.replace(/\n\n/g,'</p><p>');
  return '<p>'+h+'</p>';
}

// ============== Navigation ==============
function navigateTo(page, params) {
  S.currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const nav = document.querySelector(`.nav-item[data-page="${page}"]`);
  if(nav) nav.classList.add('active');
  const titles = {dashboard:'仪表盘',skills:'技能列表',create:'创建技能',edit:'编辑技能',detail:'技能详情',package:'打包发布',deploy:'部署管理'};
  document.getElementById('pageTitle').textContent = titles[page]||page;
  const r = {dashboard:renderDashboard,skills:renderSkillList,create:renderCreateWizard,edit:()=>renderEditSkill(params),detail:()=>renderSkillDetail(params),package:renderPackagePage,deploy:renderDeployPage};
  if(r[page]) r[page]();
}

// ============== Init ==============
async function init() {
  S.config = await api.get('/api/config');
  S.deployTargets = S.config.deployTargets || {};
  const savedTheme = localStorage.getItem('skill-creator-theme') || 'dark';
  switchTheme(savedTheme);
  const savedApp = localStorage.getItem('skill-creator-app') || 'codebuddy';
  const target = S.deployTargets[savedApp];
  if (target) {
    S.currentApp = savedApp;
    S.currentDir = target.userDir;
    document.getElementById('dirSwitcherIcon').innerHTML = APP_DIR_INFO[savedApp]?.icon || IC.folderOpen;
    document.getElementById('dirSwitcherLabel').textContent = APP_DIR_INFO[savedApp]?.label || savedApp;
    document.querySelectorAll('.dropdown-item[data-app]').forEach(el => {
      el.classList.toggle('active', el.dataset.app === savedApp);
    });
  } else {
    S.currentDir = S.config.userSkillDir;
  }
  for (const [appId, t] of Object.entries(S.deployTargets)) {
    const item = document.querySelector(`.dropdown-item[data-app="${appId}"] .dropdown-item-path`);
    if (item) item.textContent = t.userDir.replace(S.config.homeDir, '~');
  }
  document.getElementById('currentDir').textContent = S.currentDir.replace(S.config.homeDir, '~');
  await refreshSkills();
  navigateTo('dashboard');
}

async function refreshSkills() {
  const d = await api.get(`/api/skills?dir=${encodeURIComponent(S.currentDir)}`);
  S.skills = d.skills || [];
  document.getElementById('skillCount').textContent = S.skills.length;
  if(['dashboard','skills'].includes(S.currentPage)) navigateTo(S.currentPage);
}

// ============== Dashboard ==============
function renderDashboard() {
  const t = S.skills.length, l = S.skills.filter(s=>s.meta.source==='local').length;
  const mp = t-l, tf = S.skills.reduce((a,s)=>a+(s.fileCount||0),0);
  const recent = S.skills.slice(0,6);
  document.getElementById('mainContent').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-icon blue">${IC.puzzle}</div><div><div class="stat-value">${t}</div><div class="stat-label">技能总数</div></div></div>
      <div class="stat-card"><div class="stat-icon green">${IC.laptop}</div><div><div class="stat-value">${l}</div><div class="stat-label">本地创建</div></div></div>
      <div class="stat-card"><div class="stat-icon purple">${IC.shop}</div><div><div class="stat-value">${mp}</div><div class="stat-label">市场安装</div></div></div>
      <div class="stat-card"><div class="stat-icon orange">${IC.folder}</div><div><div class="stat-value">${tf}</div><div class="stat-label">总文件数</div></div></div>
    </div>
    <div style="display:flex;gap:12px;margin-bottom:28px">
      <button class="ant-btn ant-btn-primary ant-btn-lg" onclick="navigateTo('create')" style="flex:1">${IC.plus} 创建新技能</button>
      <button class="ant-btn ant-btn-lg" onclick="navigateTo('skills')" style="flex:1">${IC.puzzle} 管理技能</button>
      <button class="ant-btn ant-btn-lg" onclick="navigateTo('package')" style="flex:1">${IC.box} 打包发布</button>
    </div>
    <div class="section-title">${IC.list} 最近技能</div>
    <div class="skills-grid">${recent.map(s=>skillCard(s)).join('')}</div>
    ${t===0?`<div class="empty-state"><div class="icon">${IC.target}</div><h3>开始创建你的第一个技能</h3>
    <p>技能是模块化的扩展包，为 AI 助手添加专业知识和工作流</p>
    <button class="ant-btn ant-btn-primary ant-btn-lg" onclick="navigateTo('create')">${IC.plus} 创建技能</button></div>`:''}`;
}

function skillCard(s) {
  return `<div class="skill-card" onclick="navigateTo('detail','${s.dirName}')">
    <div class="skill-card-header"><div class="skill-card-icon">${IC.puzzle}</div>
    <span class="ant-tag ${s.meta.source==='marketplace'?'ant-tag-purple':'ant-tag-success'}">${s.meta.source==='marketplace'?'市场':'本地'}</span></div>
    <div class="skill-card-name">${esc(s.displayName)}</div>
    <div class="skill-card-desc">${esc(s.description_zh||s.description)}</div>
    <div class="skill-card-meta"><span>${IC.file} ${s.fileCount} 文件</span><span>${IC.save} ${fmtSize(s.size)}</span><span>${IC.eye} ${fmtDate(s.modifiedAt)}</span></div></div>`;
}

// ============== Skill List ==============
function renderSkillList() {
  document.getElementById('mainContent').innerHTML = `
    <div class="toolbar">
      <div class="ant-input-search">
        ${IC.search}
        <input type="text" placeholder="搜索技能..." id="searchInput" oninput="filterSkills()">
      </div>
      <button class="ant-btn ant-btn-primary" onclick="navigateTo('create')">${IC.plus} 创建技能</button>
    </div>
    <div class="skills-grid" id="skillsGrid">${S.skills.map(s=>skillCard(s)).join('')}</div>
    ${S.skills.length===0?'<div class="empty-state"><div class="icon">'+IC.inbox+'</div><h3>暂无技能</h3><p>当前目录下没有找到任何技能</p></div>':''}`;
}

function filterSkills() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const f = S.skills.filter(s => s.displayName.toLowerCase().includes(q) || (s.description||'').toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  document.getElementById('skillsGrid').innerHTML = f.map(s=>skillCard(s)).join('');
}

// ============== Skill Detail ==============
async function renderSkillDetail(name) {
  const sk = await api.get(`/api/skills/${encodeURIComponent(name)}?dir=${encodeURIComponent(S.currentDir)}`);
  if(sk.error){showToast(sk.error,'error');return;}
  S.editingSkill = sk;
  document.getElementById('pageTitle').textContent = sk.displayName;
  const mc = document.getElementById('mainContent');
  mc.innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">
      <button class="ant-btn" onclick="navigateTo('skills')">${IC.arrowLeft} 返回</button>
      <button class="ant-btn ant-btn-primary" onclick="navigateTo('edit','${name}')">${IC.edit} 编辑</button>
      <button class="ant-btn ant-btn-success" onclick="validateAction('${name}')">${IC.checkCircle} 验证</button>
      <button class="ant-btn" onclick="packageAction('${name}')">${IC.box} 打包</button>
      <button class="ant-btn" onclick="deployAction('${name}')">${IC.rocket} 部署</button>
      <button class="ant-btn ant-btn-danger" onclick="deleteAction('${name}')">${IC.delete} 删除</button>
    </div>
    <div id="valArea"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
      <div class="ant-card"><div class="ant-card-body"><div class="section-title">${IC.list} 基本信息</div>
      <table style="width:100%;font-size:13px">
        <tr><td style="color:var(--text-tertiary);padding:6px 8px;width:100px">标识名</td><td style="padding:6px 8px;font-family:var(--font-mono)">${esc(sk.name)}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:6px 8px">显示名</td><td style="padding:6px 8px">${esc(sk.displayName)}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:6px 8px">中文描述</td><td style="padding:6px 8px">${esc(sk.description_zh)}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:6px 8px">来源</td><td style="padding:6px 8px"><span class="ant-tag ${sk.meta.source==='marketplace'?'ant-tag-purple':'ant-tag-success'}">${sk.meta.source||'local'}</span></td></tr>
        <tr><td style="color:var(--text-tertiary);padding:6px 8px">工具限制</td><td style="padding:6px 8px;font-family:var(--font-mono)">${esc(sk.allowedTools)||'全部'}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:6px 8px">文件/大小</td><td style="padding:6px 8px">${sk.fileCount} 文件 / ${fmtSize(sk.size)}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:6px 8px">路径</td><td style="padding:6px 8px;font-family:var(--font-mono);font-size:11px;word-break:break-all">${esc(sk.path)}</td></tr>
      </table></div></div>
      <div class="ant-card"><div class="ant-card-body"><div class="section-title">${IC.folder} 资源目录</div><div class="file-tree">${renderTree(sk.resources)}</div></div></div>
    </div>
    <div class="ant-card"><div class="ant-card-body">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div class="section-title" style="margin:0">${IC.fileText} SKILL.md</div>
        <div class="ant-tabs" style="border:0;margin:0"><div class="ant-tab active" onclick="showTab('prev',this)">预览</div><div class="ant-tab" onclick="showTab('src',this)">源码</div></div>
      </div>
      <div id="prev" class="preview-pane" style="background:var(--bg);border-radius:var(--radius);max-height:500px;overflow-y:auto">${simpleMd(sk.body)}</div>
      <div id="src" style="display:none"><div id="cmSourceView"></div></div>
    </div></div>`;
  S._detailBody = sk.body || '';
  S._detailSourceInited = false;
}

function renderTree(res) {
  if(!res||!Object.keys(res).length) return '<div style="color:var(--text-tertiary);font-size:13px;padding:8px">无额外资源</div>';
  let h = '';
  for(const[d,items]of Object.entries(res)){
    h += `<div class="file-tree-item"><span>${IC.folder}</span> <strong>${esc(d)}/</strong></div>`;
    if(Array.isArray(items)) h += renderItems(items,1);
  }
  return h;
}

function renderItems(items, depth) {
  let h = '';
  for(const it of items){
    h += `<div class="file-tree-item" style="padding-left:${depth*16+8}px">
      <span>${it.type==='directory'?IC.folder:fileIcon(it.ext)}</span> ${esc(it.name)}
      ${it.size!==undefined?`<span style="margin-left:auto;color:var(--text-tertiary);font-size:11px">${fmtSize(it.size)}</span>`:''}
    </div>`;
    if(it.children) h += renderItems(it.children, depth+1);
  }
  return h;
}

function showTab(id, el) {
  el.parentElement.querySelectorAll('.ant-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('prev').style.display = id==='prev'?'':'none';
  document.getElementById('src').style.display = id==='src'?'':'none';
  if (id === 'src' && !S._detailSourceInited) {
    S._detailSourceInited = true;
    const initCM = () => {
      const wrap = document.getElementById('cmSourceView');
      if (!wrap) return;
      window.CM.create(wrap, { value: S._detailBody || '', lang: 'markdown', readOnly: true, lineWrapping: true, minHeight: '200px' });
    };
    if (window.CM) requestAnimationFrame(initCM);
    else window.addEventListener('cm-ready', () => requestAnimationFrame(initCM), {once:true});
  }
}

// ============== Create Wizard ==============
const TEMPLATES = {
  blank: '',
  workflow: `# 技能名称\n\n## Overview\n\n[技能功能概述]\n\n## 工作流\n\n### 步骤 1: 分析输入\n\n[说明]\n\n### 步骤 2: 处理数据\n\n[说明]\n\n### 步骤 3: 输出结果\n\n[说明]\n\n## 注意事项\n\n- [注意项]`,
  tool: `# 工具名称\n\n基于 [工具名] 封装的脚本工具集。\n\n## 前置条件\n\n\`\`\`bash\ncd scripts/\n./install-check.sh\n\`\`\`\n\n## 脚本参考\n\n| 脚本 | 用途 | 参数 |\n|------|------|------|\n| example.sh | 示例 | - |\n\n## 注意事项\n\n- [注意项]`,
  api: `# API 名称\n\n## 环境变量\n\n- \`API_ENDPOINT\` - API 地址\n- \`API_TOKEN\` - 认证 Token\n\n## 请求模板\n\n\`\`\`bash\ncurl -s -H "Authorization: Bearer $API_TOKEN" "$API_ENDPOINT/path"\n\`\`\`\n\n## 常用接口\n\n| 接口 | 说明 |\n|------|------|\n| list | 列表查询 |`,
  guidelines: `# 规范名称\n\n## 概述\n\n[规范说明]\n\n## 基本原则\n\n1. [原则 1]\n2. [原则 2]\n\n## 详细规范\n\n### 类别 A\n\n[详细说明]`
};

function renderCreateWizard() {
  S.wizardStep = 0;
  S.wizardData = { template:'blank', dirName:'', name:'', description:'', description_zh:'', description_en:'',
    allowedTools:'', homepage:'', body:'', resourceDirs:['scripts','references','assets'], targetDir:S.currentDir,
    deployApps:['codebuddy'] };
  renderStep();
}

function renderStep() {
  const steps = ['选择模板','基本信息','技能内容','目录配置','确认创建'];
  const d = S.wizardData, st = S.wizardStep;
  let stepsH = steps.map((s,i)=>`<div class="ant-step ${i<st?'completed':''} ${i===st?'active':''}">
    <div class="step-number">${i<st?'<svg width="12" height="12" viewBox="0 0 1024 1024" fill="currentColor"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1 0.4-12.8-6.3-12.8z"/></svg>':i+1}</div><div class="step-label">${s}</div></div>`).join('');

  let c = '';
  if(st===0) {
    const tpls = [{k:'blank',i:IC.file,n:'空白技能',d:'从零开始'},{k:'workflow',i:IC.deploy,n:'工作流模板',d:'步骤式流程'},{k:'tool',i:IC.setting,n:'工具集成',d:'CLI工具封装'},{k:'api',i:IC.cloud,n:'API集成',d:'REST API封装'},{k:'guidelines',i:IC.layout,n:'规范指南',d:'标准文档'}];
    c = `<h3 style="margin-bottom:16px">选择技能模板</h3><p style="color:var(--text-secondary);margin-bottom:20px">选择一个模板作为起点</p>
      <div class="template-grid">${tpls.map(t=>`<div class="template-card ${d.template===t.k?'selected':''}" onclick="selectTpl('${t.k}')">
      <div class="icon">${t.i}</div><h4>${t.n}</h4><p>${t.d}</p></div>`).join('')}</div>`;
  } else if(st===1) {
    c = `<h3 style="margin-bottom:16px">基本信息</h3>
      <div class="ant-form-row">
        <div class="ant-form-item"><label class="ant-form-label">目录名称 <span class="required">*</span></label>
        <input class="ant-input" id="w_dir" value="${esc(d.dirName)}" placeholder="例如：my-skill" oninput="S.wizardData.dirName=this.value;autoName()">
        <div class="ant-form-hint">技能文件夹名称</div></div>
        <div class="ant-form-item"><label class="ant-form-label">标识名 <span class="required">*</span></label>
        <input class="ant-input" id="w_name" value="${esc(d.name)}" placeholder="lowercase-hyphen-case" oninput="S.wizardData.name=this.value" style="font-family:var(--font-mono)">
        <div class="ant-form-hint">hyphen-case 格式，最长 64 字符</div></div>
      </div>
      <div class="ant-form-item"><label class="ant-form-label">触发描述 <span class="required">*</span></label>
        <textarea class="ant-textarea" id="w_desc" rows="3" placeholder="描述技能功能和使用场景..." oninput="S.wizardData.description=this.value" style="min-height:80px">${esc(d.description)}</textarea>
        <div class="ant-form-hint">系统根据此描述自动判断何时触发技能（最长 1024 字符）</div></div>
      <div class="ant-form-row">
        <div class="ant-form-item"><label class="ant-form-label">中文简述</label><input class="ant-input" id="w_zh" value="${esc(d.description_zh)}" placeholder="一句话中文描述" oninput="S.wizardData.description_zh=this.value"></div>
        <div class="ant-form-item"><label class="ant-form-label">英文简述</label><input class="ant-input" id="w_en" value="${esc(d.description_en)}" placeholder="English desc" oninput="S.wizardData.description_en=this.value"></div>
      </div>
      <div class="ant-form-row">
        <div class="ant-form-item"><label class="ant-form-label">允许工具</label><input class="ant-input" value="${esc(d.allowedTools)}" placeholder="Bash,Read,Glob（留空=全部）" oninput="S.wizardData.allowedTools=this.value"></div>
        <div class="ant-form-item"><label class="ant-form-label">主页链接</label><input class="ant-input" value="${esc(d.homepage)}" placeholder="https://..." oninput="S.wizardData.homepage=this.value"></div>
      </div>`;
  } else if(st===2) {
    c = `<h3 style="margin-bottom:16px">技能内容</h3><p style="color:var(--text-secondary);margin-bottom:16px">编写 SKILL.md 正文内容</p>
      <div class="code-editor"><div class="code-editor-header"><span>${IC.fileMd} SKILL.md (Markdown)</span>
      <div style="display:flex;gap:8px"><button class="ant-btn ant-btn-sm ant-btn-text" onclick="insertSnipCM('wf')">插入工作流</button>
      <button class="ant-btn ant-btn-sm ant-btn-text" onclick="insertSnipCM('sc')">插入脚本引用</button>
      <button class="ant-btn ant-btn-sm ant-btn-text" onclick="insertSnipCM('tb')">插入表格</button></div></div>
      <div id="cmWizardBody"></div></div>`;
  } else if(st===3) {
    const dirs=['scripts','references','assets','hooks','tools'];
    const desc={scripts:'可执行脚本',references:'参考文档',assets:'输出资产',hooks:'钩子配置',tools:'工具集合'};
    c = `<h3 style="margin-bottom:16px">目录配置</h3>
      <div class="ant-form-item"><label class="ant-form-label">创建位置</label>
        <div style="display:flex;gap:8px"><input class="ant-input" id="w_target" value="${esc(d.targetDir)}" oninput="S.wizardData.targetDir=this.value" style="font-family:var(--font-mono);font-size:12px">
        <button class="ant-btn ant-btn-sm" onclick="browseTgt()">${IC.folderOpen} 浏览</button></div></div>
      <div class="ant-form-item"><label class="ant-form-label">资源目录</label>
        <div class="checkbox-group">${dirs.map(dir=>`<div class="checkbox-item ${d.resourceDirs.includes(dir)?'checked':''}" onclick="toggleDir('${dir}')">
        <span>${d.resourceDirs.includes(dir)?IC.checkCircle:'<svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor" style="opacity:0.3"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/></svg>'}</span><div><div style="font-weight:500">${dir}/</div><div style="font-size:11px;color:var(--text-tertiary)">${desc[dir]}</div></div></div>`).join('')}</div></div>
      <div class="ant-card" style="margin-top:16px"><div class="ant-card-body" style="padding:16px"><div class="section-title" style="font-size:13px">${IC.folder} 目录预览</div>
      <pre style="font-family:var(--font-mono);font-size:13px;color:var(--text-secondary);line-height:1.8">${d.dirName||d.name||'skill-name'}/\n├── SKILL.md\n├── _skillhub_meta.json\n${d.resourceDirs.map((dir,i)=>`${i===d.resourceDirs.length-1?'└':'├'}── ${dir}/`).join('\n')}</pre></div></div>`;
  } else {
    const targets = Object.values(S.deployTargets);
    const deployCardsH = targets.map(t => `
      <div class="deploy-target-card ${d.deployApps.includes(t.id)?'selected':''}" data-app="${t.id}" onclick="toggleWizDeployApp('${t.id}')">
        <div class="target-check">${d.deployApps.includes(t.id)?IC.check:''}</div>
        <div class="target-header">
          <div class="target-icon" style="background:${t.color}22">${t.icon}</div>
          <div><div class="target-name">${t.name}</div><div class="target-desc">${t.description}</div></div>
        </div>
        <div class="target-info"><span>${IC.file} ${t.format === 'skill.md' ? 'SKILL.md 原生' : 'Rules 规则'}</span></div>
      </div>`).join('');

    c = `<h3 style="margin-bottom:16px">确认创建</h3>
      <div class="ant-card" style="margin-bottom:16px"><div class="ant-card-body"><table style="width:100%;font-size:14px">
        <tr><td style="color:var(--text-tertiary);padding:8px 12px;width:120px">目录名</td><td style="padding:8px 12px;font-weight:500">${esc(d.dirName||d.name)}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:8px 12px">标识名</td><td style="padding:8px 12px;font-family:var(--font-mono)">${esc(d.name)}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:8px 12px">触发描述</td><td style="padding:8px 12px;font-size:13px">${esc(d.description).substring(0,200)}${d.description.length>200?'...':''}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:8px 12px">中文简述</td><td style="padding:8px 12px">${esc(d.description_zh)||'-'}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:8px 12px">创建位置</td><td style="padding:8px 12px;font-family:var(--font-mono);font-size:12px">${esc(d.targetDir)}/${esc(d.dirName||d.name)}</td></tr>
        <tr><td style="color:var(--text-tertiary);padding:8px 12px">资源目录</td><td style="padding:8px 12px">${d.resourceDirs.join(', ')||'无'}</td></tr>
      </table></div></div>
      <div style="margin-bottom:16px">
        <div class="section-title">${IC.target} 创建后自动部署到</div>
        <p style="color:var(--text-secondary);margin-bottom:12px;font-size:13px">选择目标应用，创建完成后将自动部署（可不选）</p>
        <div class="deploy-targets">${deployCardsH}</div>
      </div>`;
  }

  document.getElementById('mainContent').innerHTML = `
    <div class="ant-steps">${stepsH}</div>
    <div class="wizard-content">${c}
      <div class="wizard-footer"><div>${st>0?`<button class="ant-btn" onclick="wizPrev()">${IC.arrowLeft} 上一步</button>`:`<button class="ant-btn" onclick="navigateTo('dashboard')">取消</button>`}</div>
      <div>${st<4?`<button class="ant-btn ant-btn-primary" onclick="wizNext()">下一步 <svg width="1em" height="1em" viewBox="0 0 1024 1024" fill="currentColor"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"/></svg></button>`:`<button class="ant-btn ant-btn-success ant-btn-lg" onclick="createSkill()">${IC.rocket} 创建技能</button>`}</div></div></div>`;
  if (st === 2) {
    if (window.CM) requestAnimationFrame(initWizardCM);
    else window.addEventListener('cm-ready', () => requestAnimationFrame(initWizardCM), {once:true});
  }
}

function selectTpl(k) { S.wizardData.template=k; S.wizardData.body=TEMPLATES[k]||''; renderStep(); }
function autoName() { const d=S.wizardData; if(!d.name){const a=d.dirName.toLowerCase().replace(/[\s_]+/g,'-').replace(/[^a-z0-9-]/g,'').replace(/-+/g,'-').replace(/^-|-$/g,'');document.getElementById('w_name').value=a;d.name=a;} }
function wizNext() { if(S.wizardStep===1){const d=S.wizardData;if(!d.name){showToast('请填写标识名','warning');return;}if(!/^[a-z0-9-]+$/.test(d.name)){showToast('标识名必须是 hyphen-case','warning');return;}if(!d.description){showToast('请填写触发描述','warning');return;}} S.wizardStep=Math.min(4,S.wizardStep+1);renderStep(); }
function wizPrev() { S.wizardStep=Math.max(0,S.wizardStep-1);renderStep(); }
function toggleDir(d) { const i=S.wizardData.resourceDirs.indexOf(d); if(i>=0)S.wizardData.resourceDirs.splice(i,1);else S.wizardData.resourceDirs.push(d); renderStep(); }

function insertSnipCM(t) {
  if (!S._wizardCmView) return;
  const snips = { wf: '\n## 工作流\n\n### 步骤 1\n\n[说明]\n', sc: '\n```bash\n./scripts/example.sh\n```\n', tb: '\n| 列1 | 列2 |\n|-----|-----|\n| 值1 | 值2 |\n' };
  const view = S._wizardCmView;
  const pos = view.state.selection.main.head;
  view.dispatch({ changes: { from: pos, insert: snips[t] } });
  view.focus();
}

function initWizardCM() {
  if (S.wizardStep !== 2 || !window.CM) return;
  const wrap = document.getElementById('cmWizardBody');
  if (!wrap) return;
  if (S._wizardCmView) { S._wizardCmView.destroy(); S._wizardCmView = null; }
  S._wizardCmView = window.CM.create(wrap, { value: S.wizardData.body || '', lang: 'markdown', minHeight: '400px', onChange: (val) => { S.wizardData.body = val; } });
}

function toggleWizDeployApp(appId) {
  const i = S.wizardData.deployApps.indexOf(appId);
  if (i >= 0) S.wizardData.deployApps.splice(i, 1);
  else S.wizardData.deployApps.push(appId);
  renderStep();
}

async function createSkill() {
  const d = S.wizardData;
  try {
    const r = await api.post('/api/skills', {
      dirName:d.dirName||d.name, name:d.name, description:d.description,
      description_zh:d.description_zh, description_en:d.description_en,
      allowedTools:d.allowedTools, homepage:d.homepage, body:d.body,
      resourceDirs:d.resourceDirs, targetDir:d.targetDir
    });
    if(r.error){showToast(r.error,'error');return;}
    showToast('技能创建成功！','success');
    if (d.deployApps && d.deployApps.length > 0) {
      showToast('正在自动部署...','info');
      const dr = await api.post(`/api/skills/${encodeURIComponent(r.dirName)}/deploy`, { level: 'user', sourceDir: d.targetDir, apps: d.deployApps });
      if (dr.results) {
        const ok = dr.results.filter(x => x.success).length;
        const fail = dr.results.filter(x => !x.success).length;
        showToast(`自动部署: ${ok} 个应用成功${fail ? `, ${fail} 个失败` : ''}`, fail ? 'warning' : 'success');
      }
    }
    await refreshSkills();
    navigateTo('detail', r.dirName);
  } catch(e) { showToast('创建失败: '+e.message,'error'); }
}

// ============== Edit Skill ==============
async function renderEditSkill(name) {
  const sk = await api.get(`/api/skills/${encodeURIComponent(name)}?dir=${encodeURIComponent(S.currentDir)}`);
  if(sk.error){showToast(sk.error,'error');return;}
  S.editingSkill = sk;
  document.getElementById('pageTitle').textContent = '编辑 - '+sk.displayName;
  const mc = document.getElementById('mainContent');

  let filesH = '';
  const allF = [];
  function collect(items, prefix) { for(const it of items){const p=prefix?prefix+'/'+it.name:it.name; if(it.type==='directory'){allF.push({n:p+'/',t:'dir'});if(it.children)collect(it.children,p);}else allF.push({n:p,t:'file',s:it.size,e:it.ext});}}
  for(const[d,items]of Object.entries(sk.resources||{})){allF.push({n:d+'/',t:'dir'}); if(Array.isArray(items))collect(items,d);}

  if(allF.length) {
    filesH = '<div style="border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden">';
    for(const f of allF) {
      filesH += `<div style="display:flex;align-items:center;padding:10px 14px;border-bottom:1px solid var(--border);font-size:13px;transition:var(--transition)" onmouseenter="this.style.background='var(--bg-hover)'" onmouseleave="this.style.background=''">
        <span style="margin-right:8px">${f.t==='dir'?IC.folder:fileIcon(f.e)}</span>
        <span style="flex:1;font-family:var(--font-mono)">${esc(f.n)}</span>
        ${f.s!==undefined?`<span style="color:var(--text-tertiary);margin-right:12px;font-size:12px">${fmtSize(f.s)}</span>`:''}
        ${f.t==='file'?`<button class="ant-btn ant-btn-sm ant-btn-text" onclick="editFile('${name}','${f.n}')">${IC.edit}</button>`:''}
        <button class="ant-btn ant-btn-sm ant-btn-text" style="color:var(--danger)" onclick="delFile('${name}','${f.n}')">${IC.delete}</button></div>`;
    }
    filesH += '</div>';
  } else filesH = '<div style="color:var(--text-tertiary);text-align:center;padding:24px">暂无资源文件</div>';

  mc.innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:20px">
      <button class="ant-btn" onclick="navigateTo('detail','${name}')">${IC.arrowLeft} 返回详情</button>
      <button class="ant-btn ant-btn-success" onclick="saveSkill('${name}')">${IC.save} 保存</button>
    </div>
    <div class="ant-tabs" id="eTabs"><div class="ant-tab active" onclick="eTab('info',this)">${IC.list} 基本信息</div>
    <div class="ant-tab" onclick="eTab('content',this)">${IC.fileMd} 技能内容</div><div class="ant-tab" onclick="eTab('files',this)">${IC.folder} 文件管理</div></div>
    <div id="eInfo"><div class="ant-card"><div class="ant-card-body">
      <div class="ant-form-row"><div class="ant-form-item"><label class="ant-form-label">标识名 <span class="required">*</span></label>
      <input class="ant-input" id="e_name" value="${esc(sk.name)}" style="font-family:var(--font-mono)"></div>
      <div class="ant-form-item"><label class="ant-form-label">触发描述 <span class="required">*</span></label>
      <textarea class="ant-textarea" id="e_desc" rows="3" style="min-height:80px">${esc(sk.description)}</textarea></div></div>
      <div class="ant-form-row"><div class="ant-form-item"><label class="ant-form-label">中文简述</label><input class="ant-input" id="e_zh" value="${esc(sk.description_zh)}"></div>
      <div class="ant-form-item"><label class="ant-form-label">英文简述</label><input class="ant-input" id="e_en" value="${esc(sk.description_en)}"></div></div>
      <div class="ant-form-row"><div class="ant-form-item"><label class="ant-form-label">允许工具</label><input class="ant-input" id="e_tools" value="${esc(sk.allowedTools)}"></div>
      <div class="ant-form-item"><label class="ant-form-label">主页链接</label><input class="ant-input" id="e_home" value="${esc(sk.homepage)}"></div></div>
    </div></div></div>
    <div id="eContent" style="display:none"><div class="code-editor"><div class="code-editor-header"><span>${IC.fileMd} SKILL.md Body</span></div>
    <div id="cmEditBody"></div></div></div>
    <div id="eFiles" style="display:none"><div class="ant-card"><div class="ant-card-body">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div class="section-title" style="margin:0">${IC.folder} 文件管理</div>
        <div style="display:flex;gap:8px"><button class="ant-btn ant-btn-sm" onclick="addFile('${name}')">${IC.file} 新建文件</button>
        <button class="ant-btn ant-btn-sm" onclick="addDir('${name}')">${IC.folder} 新建目录</button></div></div>
      ${filesH}</div></div></div>`;
  S._editSkillBody = sk.body || '';
  S._editBodyCmView = null;
  S._editBodyCmInited = false;
}

function eTab(t,el) { el.parentElement.querySelectorAll('.ant-tab').forEach(x=>x.classList.remove('active'));el.classList.add('active');
  document.getElementById('eInfo').style.display=t==='info'?'':'none';
  document.getElementById('eContent').style.display=t==='content'?'':'none';
  document.getElementById('eFiles').style.display=t==='files'?'':'none';
  if (t === 'content' && !S._editBodyCmInited) {
    S._editBodyCmInited = true;
    const initCM = () => {
      const wrap = document.getElementById('cmEditBody');
      if (!wrap) return;
      S._editBodyCmView = window.CM.create(wrap, { value: S._editSkillBody || '', lang: 'markdown', minHeight: '400px', onChange: (val) => { S._editSkillBody = val; } });
    };
    if (window.CM) requestAnimationFrame(initCM);
    else window.addEventListener('cm-ready', () => requestAnimationFrame(initCM), {once:true});
  }
}

async function saveSkill(name) {
  try {
    const bodyContent = S._editBodyCmView ? S._editBodyCmView.state.doc.toString() : S._editSkillBody;
    const r = await api.put(`/api/skills/${encodeURIComponent(name)}?dir=${encodeURIComponent(S.currentDir)}`, {
      name:document.getElementById('e_name')?.value, description:document.getElementById('e_desc')?.value,
      description_zh:document.getElementById('e_zh')?.value, description_en:document.getElementById('e_en')?.value,
      allowedTools:document.getElementById('e_tools')?.value, homepage:document.getElementById('e_home')?.value,
      body: bodyContent });
    if(r.error)showToast(r.error,'error'); else{showToast('保存成功','success');await refreshSkills();}
  }catch(e){showToast('保存失败','error');}
}

async function editFile(sk,fp) {
  const d = await api.get(`/api/skills/${encodeURIComponent(sk)}/file?dir=${encodeURIComponent(S.currentDir)}&path=${encodeURIComponent(fp)}`);
  if(d.error){showToast(d.error,'error');return;}
  const ext = fp.split('.').pop().toLowerCase();
  const langMap = {py:'python',js:'javascript',json:'json',md:'markdown',yaml:'markdown',yml:'markdown',sh:'markdown',txt:'markdown'};
  const lang = langMap[ext] || 'markdown';
  let cmView = null;
  showModal('编辑 ' + fp, `<div class="cm-editor-wrap" id="cmEditWrap"></div>`,
    async () => {
      const content = cmView ? cmView.state.doc.toString() : d.content;
      await api.put(`/api/skills/${encodeURIComponent(sk)}/file?dir=${encodeURIComponent(S.currentDir)}`, {path: fp, content});
      showToast('已保存','success');
      navigateTo('edit', sk);
    }
  );
  const initCM = () => {
    const wrap = document.getElementById('cmEditWrap');
    if (!wrap) return;
    cmView = window.CM.create(wrap, { value: d.content, lang, minHeight: '400px' });
  };
  if (window.CM) { requestAnimationFrame(initCM); }
  else { window.addEventListener('cm-ready', () => requestAnimationFrame(initCM), {once:true}); }
}

async function delFile(sk,fp) { if(!confirm(`确定删除 ${fp}？`))return; await api.del(`/api/skills/${encodeURIComponent(sk)}/file?dir=${encodeURIComponent(S.currentDir)}&path=${encodeURIComponent(fp)}`);showToast('已删除','success');navigateTo('edit',sk); }

function addFile(sk) {
  let cmView = null;
  showModal('新建文件',
    `<div class="ant-form-item"><label class="ant-form-label">路径</label><input class="ant-input" id="nfp" placeholder="scripts/my.py" style="font-family:var(--font-mono)"></div>
     <div class="ant-form-item"><label class="ant-form-label">内容</label><div class="cm-editor-wrap" id="cmNewFileWrap"></div></div>`,
    async () => {
      const p = document.getElementById('nfp').value;
      if (!p) { showToast('请填路径','warning'); return; }
      const content = cmView ? cmView.state.doc.toString() : '';
      await api.put(`/api/skills/${encodeURIComponent(sk)}/file?dir=${encodeURIComponent(S.currentDir)}`, {path: p, content});
      showToast('已创建','success');
      navigateTo('edit', sk);
    }
  );
  const initCM = () => { const wrap = document.getElementById('cmNewFileWrap'); if (!wrap) return; cmView = window.CM.create(wrap, { value: '', lang: 'markdown', minHeight: '200px' }); };
  const setupLangDetect = () => {
    const nfp = document.getElementById('nfp');
    if (nfp) {
      nfp.addEventListener('blur', () => {
        const ext = nfp.value.split('.').pop().toLowerCase();
        const langMap = {py:'python',js:'javascript',json:'json',md:'markdown'};
        if (langMap[ext] && cmView) {
          const val = cmView.state.doc.toString(); cmView.destroy();
          const wrap = document.getElementById('cmNewFileWrap');
          if (wrap) { wrap.innerHTML = ''; cmView = window.CM.create(wrap, { value: val, lang: langMap[ext], minHeight: '200px' }); }
        }
      });
    }
  };
  if (window.CM) { requestAnimationFrame(() => { initCM(); setupLangDetect(); }); }
  else { window.addEventListener('cm-ready', () => requestAnimationFrame(() => { initCM(); setupLangDetect(); }), {once:true}); }
}

function addDir(sk) { showModal('新建目录',`<div class="ant-form-item"><label class="ant-form-label">目录路径</label><input class="ant-input" id="ndp" placeholder="scripts" style="font-family:var(--font-mono)"></div>`,async()=>{const p=document.getElementById('ndp').value;if(!p){showToast('请填路径','warning');return;}await api.post(`/api/skills/${encodeURIComponent(sk)}/directory?dir=${encodeURIComponent(S.currentDir)}`,{path:p});showToast('已创建','success');navigateTo('edit',sk);}); }

// ============== Actions ==============
async function validateAction(name) {
  const r = await api.post(`/api/skills/${encodeURIComponent(name)}/validate?dir=${encodeURIComponent(S.currentDir)}`);
  const a = document.getElementById('valArea');
  if(!a)return;
  let h = `<div class="ant-alert ${r.valid?'ant-alert-success':'ant-alert-error'}">`;
  if(r.valid) h += `<div class="validation-item success">${IC.checkCircle} 技能验证通过！</div>`;
  for(const e of(r.errors||[]))h+=`<div class="validation-item error">${IC.closeCircle} ${esc(e)}</div>`;
  for(const w of(r.warnings||[]))h+=`<div class="validation-item warning">${IC.warning} ${esc(w)}</div>`;
  a.innerHTML = h+'</div>';
  showToast(r.valid?'验证通过':'验证失败',r.valid?'success':'error');
}

async function packageAction(name) {
  showToast('正在打包...','info');
  const r = await api.post(`/api/skills/${encodeURIComponent(name)}/package?dir=${encodeURIComponent(S.currentDir)}`);
  if(r.error) showToast('打包失败: '+(r.details?.errors?.join(', ')||r.error),'error');
  else showToast(`打包成功！(${fmtSize(r.size)})`,'success');
}

function deployAction(name) {
  const targets = Object.values(S.deployTargets);
  const targetCardsH = targets.map(t => `
    <div class="deploy-target-card selected" data-app="${t.id}" onclick="toggleDeployTarget(this)">
      <div class="target-check">${IC.check}</div>
      <div class="target-header">
        <div class="target-icon" style="background:${t.color}22">${t.icon}</div>
        <div><div class="target-name">${t.name}</div><div class="target-desc">${t.description}</div></div>
      </div>
      <div class="target-info"><span>${IC.folder} ${t.format === 'skill.md' ? 'SKILL.md 格式' : 'Rules 规则格式'}</span></div>
    </div>`).join('');

  showModal('部署技能', `
    <p style="margin-bottom:16px;color:var(--text-secondary)">选择要部署到的目标应用（可多选）</p>
    <div class="deploy-targets">${targetCardsH}</div>
    <div class="ant-form-item"><label class="ant-form-label">部署级别</label>
    <select class="ant-select" id="deployLevel" onchange="document.getElementById('projDirGroup').style.display=this.value==='project'?'':'none'">
      <option value="user">用户级（全局可用）</option><option value="project">项目级（仅指定项目）</option></select></div>
    <div class="ant-form-item" id="projDirGroup" style="display:none"><label class="ant-form-label">项目目录</label>
    <input class="ant-input" id="projDir" placeholder="/path/to/project" style="font-family:var(--font-mono)"></div>
    <div id="deployActionResult"></div>`,
    async () => {
      const selectedApps = Array.from(document.querySelectorAll('.deploy-target-card.selected')).map(el => el.dataset.app);
      if (!selectedApps.length) { showToast('请至少选择一个目标应用', 'warning'); return; }
      const level = document.getElementById('deployLevel').value;
      const body = { level, sourceDir: S.currentDir, apps: selectedApps };
      if (level === 'project') body.projectDir = document.getElementById('projDir').value;
      const r = await api.post(`/api/skills/${encodeURIComponent(name)}/deploy`, body);
      if (r.results) {
        const resultH = r.results.map(res => `
          <div class="deploy-result-card ${res.success ? 'success' : 'fail'}">
            <div class="result-icon">${res.success ? IC.checkCircle : IC.closeCircle}</div>
            <div class="result-info"><div class="result-app">${res.icon || ''} ${res.appName || res.app}</div>
            <div class="result-path">${res.success ? res.message : res.error}</div></div>
          </div>`).join('');
        document.getElementById('deployActionResult').innerHTML = resultH;
        showToast(r.message, r.success ? 'success' : 'warning');
      } else if (r.error) { showToast(r.error, 'error'); }
    });
}

function toggleDeployTarget(el) { el.classList.toggle('selected'); }

async function deleteAction(name) {
  if(!confirm(`确定删除技能 "${name}"？此操作不可撤销！`))return;
  const r = await api.del(`/api/skills/${encodeURIComponent(name)}?dir=${encodeURIComponent(S.currentDir)}`);
  if(r.error)showToast(r.error,'error');else{showToast('已删除','success');await refreshSkills();navigateTo('skills');}
}

// ============== Package Page ==============
function renderPackagePage() {
  document.getElementById('mainContent').innerHTML = `
    <div class="ant-card" style="margin-bottom:20px"><div class="ant-card-body">
      <div class="section-title">${IC.box} 技能打包</div>
      <p style="color:var(--text-secondary);margin-bottom:16px">将技能打包为 .skill 文件（ZIP 格式），便于分发和部署</p>
      <div class="ant-form-item"><label class="ant-form-label">选择要打包的技能</label>
      <select class="ant-select" id="pkgSkill">${S.skills.map(s=>`<option value="${s.dirName}">${esc(s.displayName)} (${s.dirName})</option>`).join('')}</select></div>
      <div style="display:flex;gap:8px">
        <button class="ant-btn ant-btn-success" onclick="doPkg()">${IC.box} 打包</button>
        <button class="ant-btn" onclick="doPkgAll()">${IC.box} 打包全部</button>
      </div>
      <div id="pkgResult" style="margin-top:16px"></div>
    </div></div>
    <div class="ant-card"><div class="ant-card-body"><div class="section-title">${IC.list} 已打包文件</div><div id="pkgList">加载中...</div></div></div>`;
  loadPkgList();
}

async function doPkg() {
  const name = document.getElementById('pkgSkill').value;
  if(!name){showToast('请选择技能','warning');return;}
  showToast('正在打包 '+name+'...','info');
  const r = await api.post(`/api/skills/${encodeURIComponent(name)}/package?dir=${encodeURIComponent(S.currentDir)}`);
  const el = document.getElementById('pkgResult');
  if(r.error) { el.innerHTML = `<div class="ant-alert ant-alert-error"><div class="validation-item error">${IC.closeCircle} ${esc(r.details?.errors?.join(', ')||r.error)}</div></div>`; }
  else { el.innerHTML = `<div class="ant-alert ant-alert-success"><div class="validation-item success">${IC.checkCircle} 打包成功！文件: ${esc(r.file)} (${fmtSize(r.size)})</div></div>`; loadPkgList(); }
}

async function doPkgAll() {
  let ok=0,fail=0;
  for(const s of S.skills){ const r = await api.post(`/api/skills/${encodeURIComponent(s.dirName)}/package?dir=${encodeURIComponent(S.currentDir)}`); if(r.error)fail++;else ok++; }
  showToast(`打包完成: ${ok} 成功, ${fail} 失败`, fail?'warning':'success');
  loadPkgList();
}

async function loadPkgList() {
  const el = document.getElementById('pkgList');
  if(!el)return;
  el.innerHTML = `<p style="color:var(--text-secondary);margin-bottom:12px">打包后的文件保存在 dist/ 目录中。</p>
    <div>${S.skills.map(s=>`<div style="display:flex;align-items:center;padding:8px 0;gap:8px;border-bottom:1px solid var(--border)">
    <span>${IC.box}</span><span style="flex:1;font-size:13px">${esc(s.displayName)}</span>
    <a href="/api/download/${encodeURIComponent(s.dirName)}" class="ant-btn ant-btn-sm" download>${IC.download} 下载</a></div>`).join('')}</div>`;
}

// ============== Deploy Page ==============
async function renderDeployPage() {
  let targetsData = { targets: [] };
  try { targetsData = await api.get('/api/deploy-targets'); } catch(e) {}
  const targets = targetsData.targets || Object.values(S.deployTargets).map(t=>({...t, userDirExists:false, skillCount:0}));

  document.getElementById('mainContent').innerHTML = `
    <div class="ant-card" style="margin-bottom:20px"><div class="ant-card-body">
      <div class="section-title">${IC.target} 部署目标</div>
      <p style="color:var(--text-secondary);margin-bottom:16px">选择要部署到的应用平台（支持同时部署到多个目标）</p>
      <div class="deploy-targets">
        ${targets.map(t => `
          <div class="deploy-target-card selected" data-app="${t.id}" onclick="toggleDeployTarget(this)">
            <div class="target-check">${IC.check}</div>
            <div class="target-header">
              <div class="target-icon" style="background:${t.color}22">${t.icon}</div>
              <div><div class="target-name">${t.name}</div><div class="target-desc">${t.description}</div></div>
            </div>
            <div class="target-info">
              <span>${t.userDirExists ? IC.checkCircle + ' 已安装' : IC.info + ' 未检测到'}</span>
              <span>${IC.box} ${t.skillCount || 0} 个技能</span>
              <span>${IC.fileText} ${t.format === 'skill.md' ? 'SKILL.md' : 'Rules'}</span>
            </div>
          </div>`).join('')}
      </div>
    </div></div>

    <div class="ant-card" style="margin-bottom:20px"><div class="ant-card-body">
      <div class="section-title">${IC.puzzle} 选择技能</div>
      <p style="color:var(--text-secondary);margin-bottom:16px">勾选要部署的技能</p>
      <div style="display:flex;flex-direction:column;gap:8px" id="deployList">
        ${S.skills.map(s => `
          <label style="display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:var(--transition)"
            onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border)'">
            <input type="checkbox" value="${s.dirName}" checked style="width:16px;height:16px;accent-color:var(--accent)">
            <div class="skill-card-icon" style="width:32px;height:32px;font-size:14px;border-radius:var(--radius)">${IC.puzzle}</div>
            <div style="flex:1"><div style="font-weight:500;font-size:13px">${esc(s.displayName)}</div>
            <div style="font-size:12px;color:var(--text-tertiary)">${esc(s.description_zh || s.description || '').substring(0, 60)}</div></div>
            <span style="font-size:12px;color:var(--text-tertiary)">${fmtSize(s.size)}</span>
          </label>`).join('')}
      </div>
      ${S.skills.length === 0 ? '<div style="color:var(--text-tertiary);text-align:center;padding:20px">暂无可部署的技能</div>' : ''}
    </div></div>

    <div class="ant-card" style="margin-bottom:20px"><div class="ant-card-body">
      <div class="section-title">${IC.setting} 部署设置</div>
      <div class="ant-form-item"><label class="ant-form-label">部署级别</label>
        <select class="ant-select" id="batchLevel" onchange="document.getElementById('batchProjDir').style.display=this.value==='project'?'':'none'">
          <option value="user">用户级（全局生效）</option><option value="project">项目级（指定项目）</option></select></div>
      <div class="ant-form-item" id="batchProjDir" style="display:none">
        <label class="ant-form-label">项目目录</label>
        <div style="display:flex;gap:8px">
          <input class="ant-input" id="batchProjPath" placeholder="/path/to/project" style="font-family:var(--font-mono);font-size:12px">
          <button class="ant-btn ant-btn-sm" onclick="browseBatchProj()">${IC.folderOpen} 浏览</button>
        </div>
      </div>
      <button class="ant-btn ant-btn-success ant-btn-lg ant-btn-block" onclick="batchDeploy()" style="margin-top:8px">${IC.rocket} 开始部署</button>
    </div></div>

    <div id="deployResult" style="margin-bottom:20px"></div>

    <div class="ant-card"><div class="ant-card-body"><div class="section-title">${IC.target} 部署路径说明</div>
    <table style="width:100%;font-size:13px">
      ${targets.map(t => `
        <tr>
          <td style="padding:8px">${t.icon} ${t.name}</td>
          <td style="padding:8px;font-family:var(--font-mono);font-size:12px">${t.userDir ? t.userDir.replace(S.config.homeDir, '~') : '-'}</td>
          <td style="padding:8px;color:var(--text-tertiary)">${t.format === 'skill.md' ? 'SKILL.md 原生格式' : '自动转换为 Rules 规则'}</td>
        </tr>`).join('')}
    </table></div></div>`;
}

async function browseBatchProj() {
  let curPath = document.getElementById('batchProjPath')?.value || S.config.homeDir || os.homedir;
  const browse = async (p) => {
    const d = await api.post('/api/browse', {path:p});
    curPath = d.current;
    let h = `<div class="dir-browser"><div class="dir-browser-header"><span>${IC.folderOpen}</span><span style="font-family:var(--font-mono);font-size:12px">${esc(d.current)}</span></div>`;
    if(d.parent!==d.current) h+=`<div class="dir-item" onclick="updateBatchProj('${d.parent}')">${IC.folder} ..</div>`;
    for(const it of d.items) h+=`<div class="dir-item" onclick="updateBatchProj('${it.path}')">${IC.folder} ${esc(it.name)}</div>`;
    h+='</div>';
    document.getElementById('batchProjBrowser').innerHTML = h;
  };
  window.updateBatchProj = async (p) => { await browse(p); };
  showModal('选择项目目录', '<div id="batchProjBrowser">加载中...</div>', () => {
    document.getElementById('batchProjPath').value = curPath;
  });
  await browse(curPath);
}

async function batchDeploy() {
  const checks = document.querySelectorAll('#deployList input:checked');
  const names = Array.from(checks).map(c => c.value);
  if (!names.length) { showToast('请选择至少一个技能', 'warning'); return; }
  const selectedApps = Array.from(document.querySelectorAll('.deploy-target-card.selected')).map(el => el.dataset.app);
  if (!selectedApps.length) { showToast('请选择至少一个部署目标', 'warning'); return; }
  const level = document.getElementById('batchLevel').value;
  const projPath = document.getElementById('batchProjPath')?.value;
  const resultEl = document.getElementById('deployResult');
  const total = names.length;
  resultEl.innerHTML = `
    <div class="ant-card"><div class="ant-card-body">
      <div class="section-title">${IC.rocket} 正在部署...</div>
      <div class="deploy-progress"><div class="deploy-progress-bar" id="deployProgressBar" style="width:0%"></div></div>
      <div id="deployProgressText" style="text-align:center;font-size:13px;color:var(--text-tertiary)">0 / ${total}</div>
      <div id="deployResultList" style="margin-top:16px"></div>
    </div></div>`;

  let completed = 0;
  const allResults = [];
  for (const n of names) {
    const body = { level, sourceDir: S.currentDir, apps: selectedApps };
    if (level === 'project') body.projectDir = projPath;
    const r = await api.post(`/api/skills/${encodeURIComponent(n)}/deploy`, body);
    completed++;
    const pct = Math.round((completed / total) * 100);
    document.getElementById('deployProgressBar').style.width = pct + '%';
    document.getElementById('deployProgressText').textContent = `${completed} / ${total}`;
    if (r.results) { allResults.push(...r.results.map(res => ({ ...res, skillName: n }))); }
  }

  const successCount = allResults.filter(r => r.success).length;
  const failCount = allResults.filter(r => !r.success).length;
  let resultH = `<div class="ant-card"><div class="ant-card-body">
    <div class="section-title">${failCount === 0 ? IC.checkCircle + ' 部署完成' : IC.warning + ' 部署完成（部分失败）'}</div>
    <div style="display:flex;gap:16px;margin-bottom:16px">
      <div class="stat-card" style="flex:1;border:0;padding:12px"><div class="stat-icon green" style="width:36px;height:36px;font-size:16px">${IC.checkCircle}</div><div><div class="stat-value" style="font-size:20px">${successCount}</div><div class="stat-label">成功</div></div></div>
      ${failCount > 0 ? `<div class="stat-card" style="flex:1;border:0;padding:12px"><div class="stat-icon" style="width:36px;height:36px;font-size:16px;background:var(--danger-bg)">${IC.closeCircle}</div><div><div class="stat-value" style="font-size:20px">${failCount}</div><div class="stat-label">失败</div></div></div>` : ''}
    </div>`;

  const byApp = {};
  for (const r of allResults) { const key = r.app || 'unknown'; if (!byApp[key]) byApp[key] = []; byApp[key].push(r); }
  for (const [appId, results] of Object.entries(byApp)) {
    const appTarget = S.deployTargets[appId] || {};
    resultH += `<div style="margin-bottom:12px"><div style="font-size:14px;font-weight:600;margin-bottom:8px">${appTarget.icon || IC.box} ${appTarget.name || appId}</div>`;
    for (const r of results) {
      resultH += `<div class="deploy-result-card ${r.success ? 'success' : 'fail'}">
        <div class="result-icon">${r.success ? IC.checkCircle : IC.closeCircle}</div>
        <div class="result-info"><div class="result-app">${r.skillName || ''}</div>
        <div class="result-path">${r.success ? r.targetPath || r.message : r.error}</div></div>
      </div>`;
    }
    resultH += '</div>';
  }
  resultH += '</div></div>';
  resultEl.innerHTML = resultH;
  showToast(`部署完成: ${successCount} 成功${failCount > 0 ? `, ${failCount} 失败` : ''}`, failCount ? 'warning' : 'success');
}

// ============== Dir Browser ==============
async function showDirBrowser() {
  let curPath = S.currentDir;
  const browse = async (p) => {
    const d = await api.post('/api/browse', {path:p});
    curPath = d.current;
    let h = `<div class="dir-browser"><div class="dir-browser-header"><span>${IC.folderOpen}</span>
      <input value="${esc(d.current)}" id="dirInput" onkeydown="if(event.key==='Enter')this.blur()" style="font-family:var(--font-mono);font-size:12px;flex:1;border:none;background:transparent;color:var(--text);outline:none"></div>`;
    if(d.parent!==d.current) h+=`<div class="dir-item" onclick="updateBrowser('${d.parent}')">${IC.folder} ..</div>`;
    for(const it of d.items) h+=`<div class="dir-item" onclick="updateBrowser('${it.path}')">${IC.folder} ${esc(it.name)}</div>`;
    h+='</div>';
    document.getElementById('dirBrowserContent').innerHTML = h;
  };
  window.updateBrowser = async (p) => { await browse(p); };
  showModal('选择技能目录', '<div id="dirBrowserContent">加载中...</div>', async()=>{
    const input = document.getElementById('dirInput');
    S.currentDir = input ? input.value : curPath;
    S.currentApp = 'custom';
    document.getElementById('dirSwitcherIcon').innerHTML = IC.folderOpen;
    document.getElementById('dirSwitcherLabel').textContent = '自定义';
    document.querySelectorAll('.dropdown-item[data-app]').forEach(el => el.classList.remove('active'));
    document.getElementById('currentDir').textContent = S.currentDir.replace(S.config.homeDir,'~');
    await refreshSkills();
    showToast('已切换到 '+S.currentDir,'success');
  });
  await browse(curPath);
}

async function browseTgt() {
  let curPath = S.wizardData.targetDir || S.currentDir;
  const browse = async (p) => {
    const d = await api.post('/api/browse', {path:p});
    curPath = d.current;
    let h = `<div class="dir-browser"><div class="dir-browser-header"><span>${IC.folderOpen}</span><span style="font-family:var(--font-mono);font-size:12px">${esc(d.current)}</span></div>`;
    if(d.parent!==d.current) h+=`<div class="dir-item" onclick="updateTgt('${d.parent}')">${IC.folder} ..</div>`;
    for(const it of d.items) h+=`<div class="dir-item" onclick="updateTgt('${it.path}')">${IC.folder} ${esc(it.name)}</div>`;
    h+='</div>';
    document.getElementById('tgtBrowserContent').innerHTML = h;
  };
  window.updateTgt = async (p) => { await browse(p); };
  showModal('选择创建位置', '<div id="tgtBrowserContent">加载中...</div>', ()=>{
    S.wizardData.targetDir = curPath;
    document.getElementById('w_target').value = curPath;
  });
  await browse(curPath);
}

// Init
document.addEventListener('DOMContentLoaded', init);
