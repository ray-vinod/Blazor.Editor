# BlazorEditor

It is a quilljs based blazor editor.

it's accept ReadOnly, Placeholder, Theme, Height etc

Very simple to use add nuget package and use it.

In this version 2.0.1 has update ui and core functions improvements like image search, resize, align etc and also package size optimized.


## How to add package into project

```
dotnet add package Blazor.Editor --version 2.0.1
```

## nuget package link

[https://www.nuget.org/packages/Blazor.Editor/]()

```
<div>
	@*GalleryUrl is endpoint of your server's image gallery to show image list, if api endpoint is not provided then url image link is still working*@
	<Editor @ref="@_quillNative" GalleryUrl="/api/images/gallery" />
</div>

<div>
	<button class="btn btn-primary" @onclick="SetHTMLAsync">Set HTML</button>
        <button class="btn btn-primary" @onclick="GetHTMLAsync">Get HTML</button>
</div>

<div>
	@_quillContent
</div>

@code {

	private string? _quillContent;
    	private Editor? _quillNative;

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

![Editor](/wwwroot/images/editor.jpg)

### Image Selection

![Image Selection](/wwwroot/images/image-choosing.jpg)

### Inserted image in editor

![Image into Editor](/wwwroot/images/image-in-editor.jpg)

### Resize and Format Options

![Format Options](/wwwroot/images/resize-options.jpg)
