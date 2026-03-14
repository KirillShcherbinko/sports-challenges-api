import { Global, Module } from "@nestjs/common";
import { CookieService } from "./service/cookie.service";

@Global()
@Module({
  providers: [CookieService],
  exports: [CookieService]
})
export class CookieModule {}