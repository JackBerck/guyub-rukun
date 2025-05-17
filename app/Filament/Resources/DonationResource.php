<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DonationResource\Pages;
use App\Filament\Resources\DonationResource\RelationManagers;
use App\Models\Donation;
use Filament\Forms;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DonationResource extends Resource
{
    protected static ?string $model = Donation::class;
    protected static ?string $navigationGroup = 'Donations & Request Management';
    protected static ?string $navigationIcon = 'heroicon-s-gift';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('User Email')
                    ->relationship('user', 'email')
                    ->searchable()
                    ->preload()
                    ->required(),
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('phone_number')
                    ->tel()
                    ->maxLength(255),
                Forms\Components\Select::make('donation_category_id')
                    ->label('Donation Category')
                    ->relationship('donationCategory', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                ToggleButtons::make('type')
                    ->required()
                    ->inline()
                    ->options(
                        [
                            "donation" => "Donation",
                            "request" => "Request"
                        ]
                    )
                    ->reactive(),
                Forms\Components\ToggleButtons::make('urgency')
                    ->helperText('Select the urgency level of the request.')
                    ->inline()
                    ->options([
                        'low' => 'Low',
                        'medium' => 'Medium',
                        'high' => 'High',
                    ])
                    ->disabled(fn(callable $get) => $get('type') !== 'request'),
                Forms\Components\Toggle::make('status')
                    ->required(),
                Forms\Components\ToggleButtons::make('is_popular')
                    ->inline()
                    ->required()
                    ->options([
                        '0' => 'No',
                        '1' => 'Yes',
                    ])
                    ->default('0')
                    ->label('Is Popular'),
                Forms\Components\Textarea::make('address')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\RichEditor::make('description')
                    ->disableToolbarButtons(["attachFiles", "codeBlock"])
                    ->required()
                    ->columnSpanFull(),
                Repeater::make('donationImages')
                    ->relationship()
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->maxSize(4096)
                            ->directory('donation-images')
                            ->imageEditor()
                            ->label('Donation Image')
                            ->required(),
                    ])
                    ->columns(1)
                    ->createItemButtonLabel('Add Donation Image'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.email')
                    ->searchable()
                    ->label('User Email'),
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone_number')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->label('Type'),
                Tables\Columns\TextColumn::make('urgency')
                    ->label('Urgency')
                    ->badge(),
                Tables\Columns\TextColumn::make('donationCategory.name')
                    ->label('Donation Category'),
                Tables\Columns\IconColumn::make('status')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_popular')
                    ->boolean(),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\CommentsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDonations::route('/'),
            'create' => Pages\CreateDonation::route('/create'),
            'edit' => Pages\EditDonation::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
