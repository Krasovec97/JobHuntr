<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('email'),
                TextInput::make('name'),
                TextInput::make('surname'),
                Forms\Components\Checkbox::make('admin'),
                Forms\Components\Checkbox::make('sales')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('surname'),
                Tables\Columns\TextColumn::make('created_at')->date('d.m.Y')->label('Registered at'),
                Tables\Columns\IconColumn::make('admin'),
                Tables\Columns\IconColumn::make('sales'),
            ])
            ->filters([
                Tables\Filters\Filter::make('Admins')->query(fn(Builder $query) => $query->where('admin', 1)),
                Tables\Filters\Filter::make('Sales')->query(fn(Builder $query) => $query->where('sales', 1))

            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create')
        ];
    }
}
