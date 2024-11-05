@extends('layouts.app')

@section('title', 'Add New Offer')

@section('content')
    <h1>Add New Offer</h1>

    <form action="{{ url('/api/added-offers/') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="offer_id">Offer ID</label>
            <input type="number" id="offer_id" name="offer_id" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="product_id">Product ID</label>
            <input type="number" id="product_id" name="product_id" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
    </form>

    @if (session('success'))
        <div class="alert alert-success mt-3">
            {{ session('success') }}
        </div>
    @endif
@endsection
