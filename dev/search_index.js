var documenterSearchIndex = {"docs":
[{"location":"quickstart/#Quickstart","page":"Quick Start","title":"Quickstart","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = DaemonMode","category":"page"},{"location":"#Introduction","page":"Home","title":"Introduction","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Julia is a great language, but the Just-in-Time compiler implies that loading a package could takes a considerable time, this is called the first plot problem. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"It is true that this time is only required for the first time (and there are options, like using and the package Revise). However, it is a great disadvantage when we want to use Julia to create small scripts.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package solve that problem. Inspired in the daemon-mode of Emacs, this package create a server/client model. This allow julia to run scripts a lot quickly scripts in Julia, because the package is maintained in memory between the run of several scripts (or run the same script several times).","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The server is the responsible of running all julia scripts.","category":"page"},{"location":"","page":"Home","title":"Home","text":"  julia -e 'using DaemonMode; serve()'\n  ```\n\n- A client, that send to the server the file to run, and return the output\n  obtained.\n  \n  ```julia\n  julia -e 'using DaemonMode; runargs()' program.jl <arguments>\n  ```\n\n  you can use an alias \n  ```sh\n  alias juliaclient='julia -e \"using DaemonMode; runargs()\"'\n  ```\n  \n  then, instead of `julia program.jl` you can do `juliaclient program.jl`. The\n  output should be the same, but with a lot less time.\n  \n# Process\n\nThe process is the following:\n\n1. The client process sends the program *program.jl* with the required arguments\n   to the server.\n   \n2. The server receives the program name, and run it, returning the output to the\n   client process. \n\n3. The client process receives the output and show it to the console.\n\n# Example\n\nSupose that we have the script *test.jl*\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia using CSV, DataFrames","category":"page"},{"location":"","page":"Home","title":"Home","text":"fname = only(ARGS) df = CSV.File(fname) |> DataFrame println(first(df, 3))","category":"page"},{"location":"","page":"Home","title":"Home","text":"\nThe normal method is:\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"sh $ time julia test.jl tsp_50.csv ... 3×2 DataFrame │ Row │ x        │ y          │ │     │ Float64  │ Float64    │ ├─────┼──────────┼────────────┤ │ 1   │ 0.420169 │ 0.628786   │ │ 2   │ 0.892219 │ 0.673288   │ │ 3   │ 0.530688 │ 0.00151249 │","category":"page"},{"location":"","page":"Home","title":"Home","text":"real\t0m18.831s user\t0m18.670s sys\t    0m0.476s","category":"page"},{"location":"","page":"Home","title":"Home","text":"\nOnly loading the CSV, DataFrames, and reading a simple file takes 18 seconds in\nmy computer (I accept donnations :-)). Every time that you run the program is\ngoing to take these 18 seconds. \n\nusing DaemonMode:\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"sh $ julia -e 'using DaemonMode; serve()' & $ time juliaclient test.jl tsp_50.csv 3×2 DataFrames.DataFrame │ Row │ x        │ y          │ │     │ Float64  │ Float64    │ ├─────┼──────────┼────────────┤ │ 1   │ 0.420169 │ 0.628786   │ │ 2   │ 0.892219 │ 0.673288   │ │ 3   │ 0.530688 │ 0.00151249 │","category":"page"},{"location":"","page":"Home","title":"Home","text":"real\t0m18.596s user\t0m0.329s sys\t0m0.318s","category":"page"},{"location":"","page":"Home","title":"Home","text":"\nBut next times, it only use:\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"sh $ time juliaclient test.jl tsp_50.csv 3×2 DataFrames.DataFrame │ Row │ x        │ y          │ │     │ Float64  │ Float64    │ ├─────┼──────────┼────────────┤ │ 1   │ 0.420169 │ 0.628786   │ │ 2   │ 0.892219 │ 0.673288   │ │ 3   │ 0.530688 │ 0.00151249 │","category":"page"},{"location":"","page":"Home","title":"Home","text":"real\t0m0.355s user\t0m0.336s sys\t0m0.317s","category":"page"},{"location":"","page":"Home","title":"Home","text":"\nA reduction from 18s to 0.3s, the next runs only time a 2% of the original time. \n\nThen you can change the file:\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia using CSV, DataFrames","category":"page"},{"location":"","page":"Home","title":"Home","text":"fname = only(ARGS) df = CSV.File(fname) |> DataFrame println(last(df, 10))","category":"page"},{"location":"","page":"Home","title":"Home","text":"\nThen, ","category":"page"},{"location":"","page":"Home","title":"Home","text":"sh $ time juliaclient test2.jl tsp_50.csv 10×2 DataFrames.DataFrame │ Row │ x        │ y        │ │     │ Float64  │ Float64  │ ├─────┼──────────┼──────────┤ │ 1   │ 0.25666  │ 0.405932 │ │ 2   │ 0.266308 │ 0.426364 │ │ 3   │ 0.865423 │ 0.232437 │ │ 4   │ 0.462485 │ 0.049489 │ │ 5   │ 0.994926 │ 0.887222 │ │ 6   │ 0.867568 │ 0.302558 │ │ 7   │ 0.475654 │ 0.607708 │ │ 8   │ 0.18198  │ 0.592476 │ │ 9   │ 0.327458 │ 0.354397 │ │ 10  │ 0.765927 │ 0.806685 │","category":"page"},{"location":"","page":"Home","title":"Home","text":"real\t0m0.372s user\t0m0.369s sys\t0m0.300s ```","category":"page"},{"location":"#Features","page":"Home","title":"Features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The advantages are:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Performance, because the packages is maintained in memory. This is specially interesting with common external packages like CSV.jl, DataFrames, ...\nThe code is run using the current directory as working directory.\nIt accept parameters. ","category":"page"}]
}