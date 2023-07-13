import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto } from './dto/auth-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ description: 'This request allows you login.' })
  @ApiOkResponse({ description: 'Login confirm.' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ description: 'This request allows you refresh your log in.' })
  @ApiOkResponse({ description: 'Refresh in confirm.' })
  @ApiBody({ type: RefreshDto })
  @Post('refresh')
  async refresh(@Body() req: RefreshDto) {
    return this.authService.refresh(req.refreshToken);
  }
}
