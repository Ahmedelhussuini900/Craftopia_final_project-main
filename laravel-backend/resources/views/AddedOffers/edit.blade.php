@extends('layouts.app')

@section('title', 'Edit Offer')

@section('content')
    <h1>Edit Offer</h1>

    <form action="{{ url('/api/added-offers/' . $offer->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="offer_name">Offer Name</label>
            <input type="text" id="offer_name" name="offer_name" class="form-control" value="{{ $offer->offer_name }}" required>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" class="form-control" required>{{ $offer->description }}</textarea>
        </div>
        <div class="form-group">
            <label for="valid_until">Valid Until</label>
            <input type="date" id="valid_until" name="valid_until" class="form-control" value="{{ $offer->valid_until }}" required>
        </div>
        <button type="submit" class="btn btn-success">Update</button>
    </form>
@endsection
