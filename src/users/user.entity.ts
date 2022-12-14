import {
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInser(): void {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate(): void {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove(): void {
        console.log('Removed User with id', this.id);
    }
}