<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DonationResource\Pages;
use App\Filament\Resources\DonationResource\RelationManagers;
use App\Models\Donation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DonationResource extends Resource
{
    protected static ?string $model = Donation::class;

    protected static ?string $navigationGroup = 'Posts';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->placeholder('Enter donation title')
                    ->maxLength(255),
                Forms\Components\RichEditor::make('description')
                    ->fileAttachmentsDirectory('attachments')
                    ->fileAttachmentsVisibility('public')
                    ->placeholder('Enter donation description')
                    ->required(),
                Forms\Components\Select::make('status')
                    ->options([
                        'tersedia' => 'Tersedia',
                        'terambil' => 'Terambil',
                    ])
                    ->default('tersedia')
                    ->required(),
                Forms\Components\TextInput::make('phone_number')
                    ->label('Phone Number')
                    ->tel()
                    ->maxLength(15)
                    ->required()
                    ->placeholder('Enter phone number'),
                Forms\Components\TextInput::make('address')
                    ->label('Address')
                    ->maxLength(255)
                    ->required()
                    ->placeholder('Enter address'),
                Forms\Components\Repeater::make('donation_images')
                    ->label('Donation Images')
                    ->relationship('donationImages')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->required()
                            ->placeholder('Upload donation image')
                            ->image()
                            ->maxSize(4096)
                            ->disk('public')
                            ->directory('donations'),
                    ])
                    ->columns(1)
                    ->addActionLabel('Add Image'),
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable()
                    ->live()
                    ->preload()
                    ->placeholder('Select user'),
                Forms\Components\Select::make('donation_category_id')
                    ->label('Donation Category')
                    ->relationship('donationCategory', 'name')
                    ->required()
                    ->searchable()
                    ->live()
                    ->preload()
                    ->placeholder('Select donation category'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50),
                Tables\Columns\TextColumn::make('status')
                    ->sortable(),
                Tables\Columns\TextColumn::make('phone_number')
                    ->label('Phone Number')
                    ->limit(15),
                Tables\Columns\ImageColumn::make('donationImages.image')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->circular()
                    ->url(fn ($record) => asset('storage/' . $record->donationImages->first()?->image)),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('User')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('donationCategory.name')
                    ->label('Donation Category')
                    ->sortable()
                    ->searchable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\EditAction::make(),
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
            //
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
