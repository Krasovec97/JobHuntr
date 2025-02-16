<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyPreRegistrationResource\Pages;
use App\Filament\Resources\CompanyPreRegistrationResource\RelationManagers;
use App\Models\CompanyPreRegistration;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CompanyPreRegistrationResource extends Resource
{
    protected static ?string $model = CompanyPreRegistration::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('street'),
                Tables\Columns\TextColumn::make('vat_id'),
                Tables\Columns\IconColumn::make('is_vat_obligated')->label('VAT'),
                Tables\Columns\TextColumn::make('referrer_id'),
                Tables\Columns\TextColumn::make('referrer.name')->label('Referrer'),
                Tables\Columns\TextColumn::make('created_at')->date('d.m.Y'),
                Tables\Columns\TextColumn::make('registration_completed_at')->date('d.m.Y'),
            ])
            ->filters([
                Tables\Filters\Filter::make('Registered')
                    ->query(fn (Builder $query): Builder => $query->whereNotNull('registration_completed_at')),
                Tables\Filters\Filter::make('Not Registered')
                    ->query(fn (Builder $query): Builder => $query->whereNull('registration_completed_at')),
            ])
            ->actions([
            ])
            ->bulkActions([
//                Tables\Actions\BulkActionGroup::make([
//                    Tables\Actions\DeleteBulkAction::make(),
//                ]),
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
            'index' => Pages\ListCompanyPreRegistrations::route('/'),
            'create' => Pages\CreateCompanyPreRegistration::route('/create'),
        ];
    }
}
