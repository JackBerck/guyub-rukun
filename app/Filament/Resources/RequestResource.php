<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RequestResource\Pages;
use App\Filament\Resources\RequestResource\RelationManagers;
use App\Models\Request;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RequestResource extends Resource
{
    protected static ?string $model = Request::class;

    protected static ?string $navigationGroup = 'Posts';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\RichEditor::make('description')
                    ->fileAttachmentsDirectory('attachments')
                    ->fileAttachmentsVisibility('public')
                    ->placeholder('Enter request description')
                    ->required(),
                Forms\Components\Select::make('status')
                    ->options([
                        'tertunda' => 'Tertunda',
                        'terpenuhi' => 'Terpenuhi',
                    ])
                    ->default('tertunda')
                    ->required(),
                Forms\Components\Select::make('urgency')
                    ->options([
                        'rendah' => 'Rendah',
                        'sedang' => 'Sedang',
                        'tinggi' => 'Tinggi',
                    ])
                    ->default('rendah')
                    ->required(),
                Forms\Components\TextInput::make('phone_number')
                    ->label('Phone Number')
                    ->tel()
                    ->maxLength(15)
                    ->required()
                    ->placeholder('Enter phone number'),
                Forms\Components\FileUpload::make('thumbnail')
                    ->image()
                    ->required()
                    ->disk('public')
                    ->directory('thumbnails')
                    ->maxSize(4096)
                    ->acceptedFileTypes(['image/*']),
                Forms\Components\TextInput::make('address')
                    ->required()
                    ->placeholder('Enter address')
                    ->maxLength(255),
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required()
                    ->live()
                    ->preload()
                    ->searchable()
                    ->placeholder('Select user'),
                Forms\Components\Select::make('donation_category_id')
                    ->label('Donation Category')
                    ->relationship('donationCategory', 'name')
                    ->required()
                    ->live()
                    ->preload()
                    ->searchable()
                    ->placeholder('Select donation category'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Title')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->label('Description')
                    ->limit(50)
                    ->sortable(),
                Tables\Columns\TextColumn::make('urgency')
                    ->label('Urgency'),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status'),
                Tables\Columns\TextColumn::make('phone_number')
                    ->label('Phone Number')
                    ->limit(15),
                Tables\Columns\ImageColumn::make('thumbnail')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->circular()
                    ->url(fn ($record) => asset('storage/' . $record->thumbnail)),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable(),
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
            'index' => Pages\ListRequests::route('/'),
            'create' => Pages\CreateRequest::route('/create'),
            'edit' => Pages\EditRequest::route('/{record}/edit'),
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
