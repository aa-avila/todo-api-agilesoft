export class LoginUserResponseDto {
  access_token: string;
  token_type: 'JWT';
  expires_in: number;
  user_id: number;
}
