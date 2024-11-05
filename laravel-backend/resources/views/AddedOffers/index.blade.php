@extends('layouts.app')

@section('title', 'Added Offers')

@section('content')
    <h1>Added Offers</h1>
    <a href="{{ route('added-offers.create') }}" class="btn btn-primary">Add New Offer</a>
    
    <table class="table mt-3">
        <thead>
            <tr>
                <th>ID</th>
                <th>Offer Name</th>
                <th>Description</th>
                <th>Valid Until</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($offers as $offer)
                <tr>
                    <td>{{ $offer->id }}</td>
                    <td>{{ $offer->offer_name }}</td>
                    <td>{{ $offer->description }}</td>
                    <td>{{ $offer->valid_until }}</td>
                    <td>
                        <a href="{{ route('added-offers.edit', $offer->id) }}" class="btn btn-warning">Edit</a>
                        <form action="{{ route('added-offers.destroy', $offer->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
