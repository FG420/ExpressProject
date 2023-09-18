import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsMongoId, IsOptional, IsString, Validate } from "class-validator";
import { IsUserId } from "../../utils/user-validator";


export class ListDTO {
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
    if (value.toLowerCase() == "true") {
        return true;
    }
    if (value.toLowerCase() == "false") {
        return false;
    }
    return value;
    })
    showCompleted: boolean;
}

export class AddTodosDTO {
    @IsString()
    title: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dueDate?: Date;

    @IsMongoId()
    @IsOptional()
    @Validate(IsUserId)
    assignedTo: string;
}

export class SetChecked {
    @IsMongoId()
    id: string;
}

export class AssignDTOBody {
    @Validate(IsUserId)
    @IsMongoId()
    userId: string;
}

export class AssignDTOParams {
    @IsMongoId()
    id: string;
}