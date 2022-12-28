import { Injectable, Global } from "@nestjs/common";

@Injectable()
export class SecondService {
  sayHello() {
    return "Hello Mr!";
  }

  sayGoodBye() {
    return `Good Bye Mr!`;
  }
}
