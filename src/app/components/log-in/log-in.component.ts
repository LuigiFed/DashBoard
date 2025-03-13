import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [DividerModule,ButtonModule,CommonModule,FormsModule,InputTextModule,],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
email: any
password: any

constructor(private auth: AuthService) { }


logIn(signupform: NgForm){
  const email = signupform.value.email
  const password = signupform.value.password

  console.log(email, password)
  this.auth.signIn(email, password).subscribe(data => {
    console.log(email , password)
  });

  signupform.reset()



}
}
