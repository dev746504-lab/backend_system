import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

/** Tự đăng ký: tạo tài khoản người quản trị + hồ sơ CSGD (chờ system_admin duyệt). */
export class RegisterInstitutionDto {
  @IsString() @MinLength(2) @MaxLength(120)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString() @MinLength(8) @MaxLength(72)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Mật khẩu cần ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số',
  })
  password: string;

  @IsString() @MinLength(2) @MaxLength(200)
  institutionName: string;

  @IsString() @MinLength(2) @MaxLength(40)
  @Matches(/^[a-z0-9-]+$/, { message: 'code chỉ gồm chữ thường, số và dấu gạch ngang' })
  institutionCode: string;
}
