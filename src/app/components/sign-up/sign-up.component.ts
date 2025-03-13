import { Component } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule,ButtonModule,InputTextModule,FloatLabelModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
constructor(private auth: AuthService){}

onSubmit(signupform: NgForm){
  const email = signupform.value.email
  const password = signupform.value.password

  console.log(email, password)
  this.auth.signUp(email, password).subscribe(data => {
    console.log(email , password)})

  signupform.reset()



}




}
