import { SetMetadata } from "@nestjs/common";

export const hasPermission = (...hasPermission:string[]) => SetMetadata('permission',hasPermission)