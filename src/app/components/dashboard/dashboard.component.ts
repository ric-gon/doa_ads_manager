import { Component } from '@angular/core';
import { FacebookApiService } from '../../services/facebook-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  data : string = 'No data';
  response: string = 'No Response';
  
  constructor(private facebookApiService: FacebookApiService){}

  getFacebookData(){
    this.facebookApiService.getAdAccountData();
  }
}
