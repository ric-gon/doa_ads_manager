import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartsService } from '../../services/charts.service';
import { ColorType, DeepPartial, TimeChartOptions } from 'lightweight-charts';
import { FacebookApiService } from '../../services/facebook-api.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent /* implements AfterViewInit */ {
  @ViewChild('adAccountSelector') adAccountSelector !: ElementRef;
  @ViewChild('campaignSelector') campaignSelector !: ElementRef;
  @ViewChild('adSetSelector') adSetSelector !: ElementRef;
  @ViewChild('adSelector') adSelector !: ElementRef;
  @ViewChild('firstChart') firstChart!: ElementRef;
  chartOptions: DeepPartial<TimeChartOptions> = {
    crosshair: { mode: 0 },
    grid: { vertLines: { visible: false }, horzLines: { visible: false } },
    layout: { textColor: 'white', background: { type: ColorType.Solid, color: 'black', } },
    handleScale: { axisPressedMouseMove: { time: false, price: false } }
  };

  data: any | JsonPipe = '';
  response: string = 'No Response';
  adaccounts = [{ "name": "Select Account" }];
  campaigns = [{ "name": "Select Campaign" }];
  adSets = [{ "name": "Select Ad Set" }];
  ads = [{ "name": "Select Ad" }];
  //adaccounts = this.decodedJson.__zone_symbol__value.adaccounts.data;


  constructor(
    private facebookApiService: FacebookApiService,
    private chartService: ChartsService
  ) { };


  /*  TEST LOCAL SECTION 
  elements = [
    '{ "adaccounts": { "data": [ { "account_id": "667215100384968", "name": "667215100384968", "id": "act_667215100384968", "campaigns": { "data": [ { "name": "Taboga verano - Copy", "id": "120202043470390139", "start_time": "2023-12-23T10:13:32-0500", "status": "ACTIVE", "adsets": { "data": [ { "name": "Taboga ll 22/09/23 - Copy 2", "id": "120202043470400139", "start_time": "2023-12-23T10:13:32-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "{{product.name}} 2023-12-23-369915174b9ba4ece93e920a0634f2ba", "id": "120202043476840139", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MTIwMjAyMDQzNDc2ODQwMTM5", "after": "MTIwMjAyMDQzNDc2ODQwMTM5" } } } } ], "paging": { "cursors": { "before": "QVFIUjU1NHBhcXZAiOHhCS3A5ZAm85Y1l3NmpkZA0hYNTNJRnhoWWcwYTlZAaGJaenlFUllZATmR5dVhUQ2ZARTzdvYkdwUXoyRVFveU1NRDVla3NwT1NvUnlSdk9R", "after": "QVFIUjU1NHBhcXZAiOHhCS3A5ZAm85Y1l3NmpkZA0hYNTNJRnhoWWcwYTlZAaGJaenlFUllZATmR5dVhUQ2ZARTzdvYkdwUXoyRVFveU1NRDVla3NwT1NvUnlSdk9R" } } } }, { "name": "Taboga verano", "id": "120201588447220139", "start_time": "2023-12-15T17:28:58-0500", "status": "PAUSED", "adsets": { "data": [ { "name": "Taboga ll 22/09/23 - Copy", "id": "120201588447990139", "start_time": "2023-12-15T17:28:58-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Chat with us 2023-12-15-0dcbd7bd4bc8838cc3d7ba86e5e8a391", "id": "120201588827420139", "status": "ACTIVE" }, { "name": "{{product.name}} 2023-12-22-0a3edad5dd357fad7526f1b4c2f4d928", "id": "120202032600570139", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MTIwMjAxNTg4ODI3NDIwMTM5", "after": "MTIwMjAyMDMyNjAwNTcwMTM5" } } } } ], "paging": { "cursors": { "before": "QVFIUm81VUtsWS1FczJrY2xRc09NUGZAadGhLQlJnaTU3VjkzcmxsMmlJRlJFZA3hyUElGb2VSNVRfc0V3RmxSY05UWEo3bGFXdXp3YTRtZAk5YSHpmY0dGLXRR", "after": "QVFIUm81VUtsWS1FczJrY2xRc09NUGZAadGhLQlJnaTU3VjkzcmxsMmlJRlJFZA3hyUElGb2VSNVRfc0V3RmxSY05UWEo3bGFXdXp3YTRtZAk5YSHpmY0dGLXRR" } } } }, { "name": "Dia de la Madre ll ESP", "id": "120200672625390139", "start_time": "2023-12-07T18:47:14-0500", "status": "PAUSED", "adsets": { "data": [ { "name": "Dia de la madre", "id": "120200672625410139", "start_time": "2023-12-07T18:47:14-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "{{product.name}} 2023-12-08-82b908d17a14baad101246a00be60fe6", "id": "120200726049360139", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MTIwMjAwNzI2MDQ5MzYwMTM5", "after": "MTIwMjAwNzI2MDQ5MzYwMTM5" } } } } ], "paging": { "cursors": { "before": "QVFIUnJpZAmJDaGV1UzZAueG0yaWNBbHEzNl9EVDZApY0hCQlF5SktsZAHM5UmRRN0NzNkY1cFA4bnBGTmFWdW5KV2x0V3duRlc4V2xMQnJ0VEJ3am9RdE9sdzVn", "after": "QVFIUnJpZAmJDaGV1UzZAueG0yaWNBbHEzNl9EVDZApY0hCQlF5SktsZAHM5UmRRN0NzNkY1cFA4bnBGTmFWdW5KV2x0V3duRlc4V2xMQnJ0VEJ3am9RdE9sdzVn" } } } }, { "name": "Lead Gen Booking  - Call ll Taboga & Lunada", "id": "23858752638280138", "start_time": "2023-09-22T18:25:29-0500", "status": "PAUSED", "adsets": { "data": [ { "name": "Lunada ll 22/09/23", "id": "23858759480150138", "start_time": "2023-09-22T18:45:43-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Book now! Limited spots💘 2023-09-22-a08a409a01117c44ab0ce9b9afc346fc", "id": "23858760104640138", "status": "ACTIVE" }, { "name": "¡Reserva ya! Cupos limitados❤️ 2023-09-22-1a3decae413c6e99983e16d7398f8b55", "id": "23858760659870138", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MjM4NTg3NjAxMDQ2NDAxMzgZD", "after": "MjM4NTg3NjA2NTk4NzAxMzgZD" } } } }, { "name": "Taboga ll 22/09/23", "id": "23858752638250138", "start_time": "2023-09-22T18:25:29-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "¡Reserva ya! Cupos limitados 🐳 2023-12-15-0873b2e22197b84a3cfd193ad89e3653", "id": "120201587899690139", "status": "ACTIVE" }, { "name": "Book now! Limited spots🐳 2023-09-22-91684d7d57dd55974933c25d52d9c235", "id": "23858759463200138", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MTIwMjAxNTg3ODk5NjkwMTM5", "after": "MjM4NTg3NTk0NjMyMDAxMzgZD" } } } } ], "paging": { "cursors": { "before": "QVFIUk1vWGZAWMmQ5N0drUkZAucWFYdFJVdXpTal9rdGpBa3BYS1FHQkxidl8xalh6ZAy1jWG1xNmk3ME1CdXBfeU8tNkFzdnhGbVNoNXlwUTBsNlVRcV92c2xn", "after": "QVFIUmFWOF9IRFRpQ0VGQ3BqQk5RSzNRc2I4RDJITkhMRkt4a0N4SlRPRF9wcGUyMktQYl9GX0ZAPZAnU4NmxVN253QVRlUnMtZAFFqMi1sdjloZAzZAGa05keGR3" } } } }, { "name": "Lead Gen Booking  - Call ll ESP", "id": "23856544142510138", "start_time": "2023-08-10T15:17:09-0500", "status": "PAUSED", "adsets": { "data": [ { "name": "Tiktok Format ll ESP", "id": "23856544142720138", "start_time": "2023-08-10T15:17:09-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "¡Reserva ya! Cupos limitados 🐳 2023-08-11-db46761c56c703b7adb7ccc6a73fb2c4", "id": "23856564041410138", "status": "ACTIVE" }, { "name": "¡Reserva ya! Cupos limitados 🐳 2023-08-10-8b71c5a60df71a52bc8ead87acac949c", "id": "23856547490050138", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MjM4NTY1NjQwNDE0MTAxMzgZD", "after": "MjM4NTY1NDc0OTAwNTAxMzgZD" } } } } ], "paging": { "cursors": { "before": "QVFIUlZAHTGVubGNRNEtWd2NNRy05X1hzd3NhVTZAYZAEE2bXZAnNFpoam5zMzFrdGhfT0x6dXRGTGozYWlVUnFVcjFNaVlxSzJadFhXM3pITk9ZAamc1ZAXRiaEFn", "after": "QVFIUlZAHTGVubGNRNEtWd2NNRy05X1hzd3NhVTZAYZAEE2bXZAnNFpoam5zMzFrdGhfT0x6dXRGTGozYWlVUnFVcjFNaVlxSzJadFhXM3pITk9ZAamc1ZAXRiaEFn" } } } }, { "name": "Whale-watching ll ENG", "id": "23856531741310138", "start_time": "2023-08-10T01:20:29-0500", "status": "PAUSED", "adsets": { "data": [ { "name": "Whale-watching", "id": "23856531741430138", "start_time": "2023-08-10T01:20:29-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Whale Hello There, September! 🐋 2023-08-10-fcea9950668dbd45138506020b0ae73c", "id": "23856544099070138", "status": "ACTIVE" }, { "name": "Whale Hello There, September! 🐋 2023-08-09-35fa7befa310afa42e478b6eca16011f", "id": "23856533136900138", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MjM4NTY1NDQwOTkwNzAxMzgZD", "after": "MjM4NTY1MzMxMzY5MDAxMzgZD" } } } } ], "paging": { "cursors": { "before": "QVFIUnVQYW1vMWc0VnFLY0o2aGowWDlQbE5BRnd0cTAzNkd5U0txODhxVlhPOEZAlLWZAHUWhMOUg5ZAkdNc245bmhtYnE4UGdCZAE5qS1ZA6T09HNk5pNi00SlJn", "after": "QVFIUnVQYW1vMWc0VnFLY0o2aGowWDlQbE5BRnd0cTAzNkd5U0txODhxVlhPOEZAlLWZAHUWhMOUg5ZAkdNc245bmhtYnE4UGdCZAE5qS1ZA6T09HNk5pNi00SlJn" } } } } ], "paging": { "cursors": { "before": "QVFIUnIyMTZACbnpjOGs3NHBJeU1tSVR0VmhLUjhlTnVJMEhwVHZAoazdCZAl9GbTBrcGdndnR6bmJsYnhJb0YxZAFBQQzNpd3d0YktaX09lYUFrSXotSTdWb2JR", "after": "QVFIUkZAVdXZASN0ozZAHlQZAVhMUDZA6M0t2LXBVU2tSSDU4NXltN3lVaEw2QjFoYjVXMS1KSktabEd4ZAWxiZAEx5bFJHbjJ0ZAWNIekRLSkZAnUnVrQzRtMUJuMXNn" } } } }, { "account_id": "758545262530204", "name": "DOA -ACA", "id": "act_758545262530204", "campaigns": { "data": [ { "name": "[12/22/2023] Promoting tel:+19052775967", "id": "120202962295990218", "start_time": "2023-12-22T22:12:42-0500", "status": "ACTIVE", "adsets": { "data": [ { "name": "[12/22/2023] Promoting tel:+19052775967", "id": "120202962296140218", "start_time": "2023-12-22T22:12:42-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Haz tu pedido ya!! 2023-12-22-73bf38f7690789131f37548b3cde400c", "id": "120202962295220218", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MTIwMjAyOTYyMjk1MjIwMjE4", "after": "MTIwMjAyOTYyMjk1MjIwMjE4" } } } } ], "paging": { "cursors": { "before": "QVFIUnRYZAmJ2b29rYm9sRjFRRjBuRXlRN1Q2V2hXclRMM2xTWFltOFlkUjVTT3RMcTdYRnRRLU1RV25IdVR6eV94TmJfUVdmWmd1djhoNjZAlY2QyZAXlxOXd3", "after": "QVFIUnRYZAmJ2b29rYm9sRjFRRjBuRXlRN1Q2V2hXclRMM2xTWFltOFlkUjVTT3RMcTdYRnRRLU1RV25IdVR6eV94TmJfUVdmWmd1djhoNjZAlY2QyZAXlxOXd3" } } } }, { "name": "[12/12/2023] Promoting https://facebook.com/BrasasLatinFood", "id": "120201939089140218", "start_time": "2023-12-12T16:02:05-0500", "status": "ACTIVE", "adsets": { "data": [ { "name": "[12/12/2023] Promoting https://facebook.com/BrasasLatinFood", "id": "120201939089360218", "start_time": "2023-12-12T16:02:05-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Ordena tu fiesta hoy 2023-12-15-45871eb5accbc8bb9a6f3563e34e92f9", "id": "120202232185390218", "status": "ACTIVE" } ], "paging": { "cursors": { "before": "MTIwMjAyMjMyMTg1MzkwMjE4", "after": "MTIwMjAyMjMyMTg1MzkwMjE4" } } } } ], "paging": { "cursors": { "before": "QVFIUmhERnIzVmpJbGZANRVIwMlBhcDEyNVdaZAjdJUkphWmdjOWNhSk9wekRDbnU5ajRuaW41dV9tckcwT0FhY3FuU3ZA5eTJKREllbkVjRUlZAaC1pQ2RSektB", "after": "QVFIUmhERnIzVmpJbGZANRVIwMlBhcDEyNVdaZAjdJUkphWmdjOWNhSk9wekRDbnU5ajRuaW41dV9tckcwT0FhY3FuU3ZA5eTJKREllbkVjRUlZAaC1pQ2RSektB" } } } }, { "name": "[ACA Prosperity Health]-[HH Relief]", "id": "120201400288290218", "start_time": "2023-12-07T02:00:34-0500", "status": "PAUSED", "adsets": { "data": [ { "name": "[ACA]-[HL1]-[AT1]-[CR4A]", "id": "120201400288350218", "start_time": "2023-12-07T02:00:34-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Last Chance to Claim a Holiday Help Package 2023-12-06-a6b43f61850592f7326f40586ba2bada", "id": "120201400717870218", "status": "ACTIVE", "image_url": "https://scontent.fbog4-2.fna.fbcdn.net/v/t45.1600-4/406350341_120201399307790218_2936430153103051576_n.png?stp=dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=tR3dESRsmEQAb78Tnky&_nc_ht=scontent.fbog4-2.fna&edm=AP4hL3IEAAAA&oh=00_AfB28YXaZpZP4oxwPaWkCQH4JhRpSCe-ioIozhyvizeuvQ&oe=661B3690" } ], "paging": { "cursors": { "before": "MTIwMjAxNDAwNzE3ODcwMjE4", "after": "MTIwMjAxNDAwNzE3ODcwMjE4" } } } } ], "paging": { "cursors": { "before": "QVFIUmpXYzRoSnF1UW5tR2cyMnozdWItUW1iTFA0SlFESXhGQXgxWFpwT0U3WHJKRm9sMGIxelp3cXhRLUg0ajJDcDI3SkdlOTQzSG1zSVowczM5VTNFd0VR", "after": "QVFIUmpXYzRoSnF1UW5tR2cyMnozdWItUW1iTFA0SlFESXhGQXgxWFpwT0U3WHJKRm9sMGIxelp3cXhRLUg0ajJDcDI3SkdlOTQzSG1zSVowczM5VTNFd0VR" } } } }, { "name": "[ACA Prosperity Health]-[HH Stimulus]", "id": "120200888341340218", "start_time": "2023-12-07T02:00:34-0500", "status": "PAUSED", "adsets": { "data": [ { "name": "[ACA]-[HL1]-[AT1]-[CR2A]", "id": "120201398849310218", "start_time": "2023-12-07T02:00:34-0500", "status": "PAUSED", "adcreatives": { "data": [ { "name": "Last Chance to Claim a Holiday Help Package 2023-12-06-ce2df165b3957ef5cddad57a51c50d89", "id": "120201400276930218", "status": "ACTIVE", "image_url": "https://scontent.fbog4-1.fna.fbcdn.net/v/t45.1600-4/406247964_120201399307720218_3987992534270090643_n.png?stp=dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CVqB0u0JKkAAb7Mkhm9&_nc_ht=scontent.fbog4-1.fna&edm=AP4hL3IEAAAA&oh=00_AfB7lYoytddTuwc8OoJxXwoNPRc1fkocpVFGavKN9eVlGA&oe=661B4F9E" } ], "paging": { "cursors": { "before": "MTIwMjAxNDAwMjc2OTMwMjE4", "after": "MTIwMjAxNDAwMjc2OTMwMjE4" } } } }, { "name": "[ACA]-[HL1]-[AT1]-[CR1B]", "id": "120201398849300218", "start_time": "2023-12-07T02:00:34-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Last Chance to Claim a Holiday Help Package 2023-12-06-02809fccf6a4d03d910041762f401067", "id": "120201400276850218", "status": "ACTIVE", "image_url": "https://scontent.fbog4-1.fna.fbcdn.net/v/t45.1600-4/401264310_120201399307810218_2603678784056880663_n.png?stp=dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kevi0YKGLdYAb65RvxK&_nc_ht=scontent.fbog4-1.fna&edm=AP4hL3IEAAAA&oh=00_AfBoEPZsnMDVR9uk7pgiv77GAEhrWKehbbxD4EuUN5KxNg&oe=661B3F54" } ], "paging": { "cursors": { "before": "MTIwMjAxNDAwMjc2ODUwMjE4", "after": "MTIwMjAxNDAwMjc2ODUwMjE4" } } } }, { "name": "[ACA]-[HL1]-[AT1]-[CR3A]", "id": "120201398849290218", "start_time": "2023-12-07T02:00:34-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Last Chance to Claim a Holiday Help Package 2023-12-06-09283ca371107e5de8d9bc57dee368bf", "id": "120201400227670218", "status": "ACTIVE", "image_url": "https://scontent.fbog4-1.fna.fbcdn.net/v/t45.1600-4/408399272_120201399307660218_8039203999124734719_n.png?stp=dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=neKOHsjkdwgAb4eSfzI&_nc_ht=scontent.fbog4-1.fna&edm=AP4hL3IEAAAA&oh=00_AfB25bffDm01AavWmnlRK_MtKdpAlA72RaRW48f3BjuH1w&oe=661B22B0" } ], "paging": { "cursors": { "before": "MTIwMjAxNDAwMjI3NjcwMjE4", "after": "MTIwMjAxNDAwMjI3NjcwMjE4" } } } }, { "name": "[ACA]-[HL1]-[AT1]-[CR1A]", "id": "120201398350530218", "start_time": "2023-12-07T02:00:34-0500", "status": "ACTIVE", "adcreatives": { "data": [ { "name": "Last Chance to Claim a Holiday Help Package 2023-12-06-74855945f2dfa4b7b424f887c2306680", "id": "120201398248290218", "status": "ACTIVE", "image_url": "https://scontent.fbog4-2.fna.fbcdn.net/v/t45.1600-4/408341271_120201397820450218_4877899254912496138_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7qxjJM3noI4Ab4YPkF0&_nc_ht=scontent.fbog4-2.fna&edm=AP4hL3IEAAAA&oh=00_AfCoI_EkpnF1xg7Mn9cal1_OgLfPwgxKGJO5vOm3o8Oz-Q&oe=661B44E0" } ], "paging": { "cursors": { "before": "MTIwMjAxMzk4MjQ4MjkwMjE4", "after": "MTIwMjAxMzk4MjQ4MjkwMjE4" } } } } ], "paging": { "cursors": { "before": "QVFIUm9wWXJHdHhqemE0QlQ2WlVPS0RYMUU2cVZAkME9xYjNWUTlSRkVqdFFrOXpZAUXAxa1RUQTdtSHNaSVE5YVRMUDVzMDAxWnRjbHpUVVFIQm5SMS1ra3BB", "after": "QVFIUlRwbS0zamZAqek1YUEdrWF8wZAXlUaFdhbFJ5QjFGQVJNX1FiZA1FvdG14TjdtLXpCOXJ2QjA2N3hDZAzAyeGhEdndaTzNFcXlXMnU0VEM2ZA2ZAsYjQ0azJB" } } } } ], "paging": { "cursors": { "before": "QVFIUk9tOUoyX245aGt6Y0tCZAFliNFdlNGVmOEI2Skw3azdFV1J5ZAVdaREFicGpoNzJzUUtYSXZAwTV9SaXc1d3NjQWh3ZAm9RYUFXcGR6TVQzaFk1OGdyN21B", "after": "QVFIUnFVM004cmt6bEJvYUkxckZAPb0N1RGxhWDZAQQmVfcExaMktYUHN4bzl3Ni1pcTFRUHVfS1J3aS0yU3NIWlJQbWJRZA2kyYnFiRTdkaHlmVVJUSEhNTHB3" } } } }, { "account_id": "1010020233473868", "name": "Ricardo Gonzalez", "id": "act_1010020233473868" } ], "paging": { "cursors": { "before": "MjM4NDM0Mjk5ODEyMzAxMzgZD", "after": "MjM4NjAxMjIxNTQ0NjA2NjIZD" } } }, "id": "198819476641267" }'
  ];

  jsonString = this.elements[0];
  decodedJson = JSON.parse(this.jsonString);


  constructor(
    private facebookApiService: FacebookApiService,
    private chartService: ChartsService
  ) { };

  getSelectedElement(selector: HTMLSelectElement) {
    this.adaccounts.push(...this.decodedJson.adaccounts.data);
    this.campaigns.push(...this.decodedJson.adaccounts.data[0].campaigns.data);
    this.adSets.push(...this.decodedJson.adaccounts.data[0].campaigns.data[0].adsets.data);
    this.ads.push(...this.decodedJson.adaccounts.data[0].campaigns.data[0].adsets.data[0].adcreatives.data);

    console.log(selector.value);
  };

 */

  getSelectedElement(selector: HTMLSelectElement, level: string) {
    if (level == "adAccount") {
      let accountIndex = this.data.adaccounts.data.findIndex((adaccount: any) =>
        adaccount.name === selector.value
      );
      if ((this.data.adaccounts.data[accountIndex].campaigns !== undefined) && (this.data.adaccounts.data[accountIndex].campaigns.data !== undefined)) {
        this.campaigns = [{ "name": "Select Campaign" }];
        this.adSets = [{ "name": "Select Ad Set" }];
        this.ads = [{ "name": "Select Ad" }];
        this.campaigns.push(...this.data.adaccounts.data[accountIndex].campaigns.data);
      } else {
        this.campaigns = [{ "name": "There are no campaigns..." }];
        this.adSets = [{ "name": "There are no Ad Sets" }];
        this.ads = [{ "name": "There are no Ads" }];
      }
    } else if (level == "campaign") {
      let accountIndex = this.data.adaccounts.data.findIndex((adaccount: any) =>
        adaccount.name === this.adAccountSelector.nativeElement.value
      );
      let campaignIndex = this.data.adaccounts.data[accountIndex].campaigns.data.findIndex((campaign: any) =>
        campaign.name === selector.value
      );
      if (this.data.adaccounts.data[accountIndex].campaigns.data[campaignIndex].adsets !== undefined && this.data.adaccounts.data[accountIndex].campaigns.data[campaignIndex].adsets.data !== undefined) {
        this.adSets = [{ "name": "Select Ad Set" }];
        this.ads = [{ "name": "Select Ad" }];
        this.adSets.push(...this.data.adaccounts.data[accountIndex].campaigns.data[campaignIndex].adsets.data);
      } else {
        this.adSets = [{ "name": "There are no Ad Sets" }];
        this.ads = [{ "name": "There are no Ads" }];
      }
    } else if (level == "adset") {
      this.ads = [{ "name": "Select Ad" }];
      let accountIndex = this.data.adaccounts.data.findIndex((adaccount: any) =>
        adaccount.name === this.adAccountSelector.nativeElement.value
      );
      let campaignIndex = this.data.adaccounts.data[accountIndex].campaigns.data.findIndex((campaign: any) =>
        campaign.name === this.campaignSelector.nativeElement.value
      );
      let adSetIndex = this.data.adaccounts.data[accountIndex].campaigns.data[campaignIndex].adsets.data.findIndex((adSet: any) =>
        adSet.name === selector.value
      );
      if (this.data.adaccounts.data[accountIndex].campaigns.data[campaignIndex].adsets.data[adSetIndex].adcreatives !== undefined && this.data.adaccounts.data[accountIndex].campaigns.data[campaignIndex].adsets.data[adSetIndex].adcreatives.data !== undefined) {
        this.ads = [{ "name": "Select Ad" }];
        this.ads.push(...this.data.adaccounts.data[accountIndex].campaigns.data[campaignIndex].adsets.data[adSetIndex].adcreatives.data);
      } else {
        this.ads = [{ "name": "There are no Ads" }];
      }
    }
  };

  generateChart() {
    this.chartService.generateChart(this.firstChart.nativeElement, this.chartOptions);
  };

  getFacebookData(): void {
    this.facebookApiService.getAdAccountData().then(jsonString => {
      this.data = jsonString;
      this.adaccounts.push(...jsonString.adaccounts.data);
    });
  };

  generateDropdowns() {
    this.adaccounts.forEach((adaccount: any) => {
      console.log(adaccount);
      if (adaccount.campaigns) {
        console.log("campaign: ", adaccount.id, adaccount.name);
      }
    });
  };

}
