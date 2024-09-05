using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Text.Json;

namespace Blazor.Editor;
public partial class Editor
{
    [Inject]
    private IJSRuntime? JSRuntime { get; set; }

    [Parameter]
    public bool ReadOnly { get; set; } = false;

    [Parameter]
    public string Placeholder { get; set; } = "Insert text here...";

    [Parameter]
    public string Theme { get; set; } = "snow";

    [Parameter]
    public string GalleryUrl { get; set; } = "/api/images/gallery";

    private List<ImageFile> _filteredImages = [];
    private List<ImageFile>? _images;

    private bool _isImageModalVisible = false;
    private ElementReference _quillElement;
    IJSObjectReference? _module;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _module = await JSRuntime!.InvokeAsync<IJSObjectReference>("import", "./_content/Blazor.Editor/Editor.razor.js");
            await _module!.InvokeVoidAsync("registerEditorInstance", DotNetObjectReference.Create(this));
            await CreateQuill();
        }
    }

    private async ValueTask<object> CreateQuill()
    {
        return await _module!.InvokeAsync<object>("initQuill", _quillElement, GalleryUrl, ReadOnly, Placeholder, Theme);
    }

    public async Task SetHTMLAsync(string content)
    {
        await _module!.InvokeVoidAsync("setQuillHTML", content);
    }

    public async Task<string> GetHTMLAsync()
    {
        return await _module!.InvokeAsync<string>("getQuillHTML");
    }

    [JSInvokable]
    public async Task ShowImageModal()
    {
        _isImageModalVisible = true;
        var imageJson = await _module!.InvokeAsync<string>("fetchImagesAsync");

        JsonSerializerOptions jsonSerializerOptions = new()
        {
            PropertyNameCaseInsensitive = true
        };

        var options = jsonSerializerOptions;

        _images = JsonSerializer.Deserialize<List<ImageFile>>(imageJson, options);
        _filteredImages = _images!;

        StateHasChanged();
    }

    private async Task ImageClicked(ImageFile image)
    {
        _isImageModalVisible = false;
        bool isUrl = string.IsNullOrWhiteSpace(image.Name);

        await _module!.InvokeVoidAsync("insertImage", isUrl, image.Url, image.Name);
        StateHasChanged();
    }

    private void OnSearchTexChanged(ChangeEventArgs e)
    {
        string searchText = e.Value?.ToString()?.ToUpper() ?? string.Empty;

        if (!string.IsNullOrWhiteSpace(searchText))
        {
            _filteredImages = _images!.Where(x => x.Name!.Contains(searchText, StringComparison.CurrentCultureIgnoreCase)).ToList();
        }
    }
}