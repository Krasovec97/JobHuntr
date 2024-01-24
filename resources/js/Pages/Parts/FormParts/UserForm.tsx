import {FormWrapper} from "./FormWrapper";

type UserData = {
    firstName: string,
    lastName: string,
    age; string,
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export function UserForm({ firstName, lastName, age, updateFields }: UserFormProps) {
    return (
        <FormWrapper title={"User Details"}>
            <label>First Name</label>
            <input required={true}
                autoFocus
                type="text"
                className={"form-control"}
                value={firstName}
                onChange={e => updateFields({firstName: e.target.value})}/>

            <label>Last Name</label>
            <input required={true}
                type="text"
                className={"form-control"}
                value={lastName}
                onChange={e => updateFields({lastName: e.target.value})}/>

            <label>Age</label>
            <input required={true}
                min={1}
                type="number"
                className={"form-control"}
                value={age}
                onChange={e => updateFields({age: e.target.value})}/>
        </FormWrapper>
    )
}
