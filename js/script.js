function searchMovie(){

    $('#list-movie').html('')

    $.ajax ({
        type: 'get',
        dataType: 'json',
        url: 'http://omdbapi.com',
        data:{
            'apikey': '54ac2538',
            's' : $('#input-search').val()
        },

        success: function(hasil){
            if(hasil.Response == "True"){
                let movie = hasil.Search

                $.each(movie, function(i, data) {
                    $('#list-movie').append(`
                    <div class="col-md-3">
                        <div class="card mb-3">
                            <img src="`+ data.Poster +`" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                    <a href="#" class="card-link detail" data-toggle="modal" data-target="#modal-detail" data-id="`+ data.imdbID +`">Lihat detail</a>
                           </div>
                        </div>
                    </div>
                    `)
                })

                $('#input-search').val('')

            }else{
                $('#list-movie').html(`
                <div class="row">
                    <h1>`+ hasil.Error +`</h1>
                </div>
                `)
            }
        }
    })
}

$('#btn-search').on('click', function(){
        searchMovie();
})

$('#input-search').on('keyup', function(e){
    if(e.keyCode == 13) {
        searchMovie();
    }
})

$('#list-movie').on('click', '.detail' ,function(){
    
    $.ajax({
        data: 'get',
        dataType: 'json',
        url: 'http://omdbapi.com',
        data: {
            'apikey' : '54ac2538',
            'i' : $(this).data('id')
        },

        success: function (hasil){
            if(hasil.Response == "True"){
                $('.modal-body').html(`
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ hasil.Poster +`" class="card-img-top">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h5>`+ hasil.Title +`</h5></li>
                                    <li class="list-group-item">Release: `+ hasil.Released +`</li>
                                    <li class="list-group-item">Genre: `+ hasil.Genre +`</li>
                                    <li class="list-group-item">Actors: `+ hasil.Actors+`</li>
                                    <li class="list-group-item">Director: `+ hasil.Director +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                `)
            }
        }

    })

})

