# BlazorEditor

It is a quilljs based blazor editor.

it's accept ReadOnly, Placeholder, Theme, Height etc

Very simple to use add nuget package and use it.

In the version 2.0.0 has update ui and core functional improvements.

```
@using Blazor.Editor

<Editor @ref="@_quillNative" />

@code{
	private Editor? _quillNative;
}
```

## How to add package into project

```
dotnet add package Blazor.Editor --version 2.0.0
```

## nuget package link

[https://www.nuget.org/packages/Blazor.Editor/]()

```
<div class="card">
    <div class="card-body">
        <h3 class="card-title">Quill native</h3>
        <Editor @ref="@_quillNative" GalleryUrl="/api/images/gallery" />  @*server endpoint*@
    </div>
    <div class="card-footer">
        <button class="btn btn-primary" @onclick="SetHTMLAsync">
            Set HTML
        </button>
        <button class="btn btn-primary" @onclick="GetHTMLAsync">
            Get HTML
        </button>
        <div>
            @_quillContent
        </div>
    </div>
</div>

@code {
	private string? _quillContent;
    private Editor? _quillNative;

    protected override void OnInitialized()
    {
        base.OnInitializedAsync();
    }

    public async Task SetHTMLAsync()
    {
        string img = "<p><img src='https://images.stockcake.com/public/5/0/2/502bbf64-d559-4efe-bba5-59ef7ffad5a8/toddler-baking-cookies-stockcake.jpg' /></p>";
        await _quillNative!.SetHTMLAsync(img);
        StateHasChanged();
    }

    public async Task GetHTMLAsync()
    {
        _quillContent = await _quillNative!.GetHTMLAsync();
        StateHasChanged();
    }
}
```

### Editor

![Example Image](/wwwroot/images/editor.png)

### Choose image

![Example Image](/wwwroot/images/image%20choosing.png)

### Inserted image

![Example Image](/wwwroot//images/image%20in%20editor.png)

### Resizing and formate image

![Example Image](/wwwroot/images/resize%20options.png)
