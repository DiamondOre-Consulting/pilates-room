import React from 'react';
import JoditEditor from 'jodit-react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { useDispatch } from 'react-redux';
import { createBlog } from '@/Redux/Slices/blogSlice';

const BlogForm = ({ onSubmit, initialData = {} }) => {
    const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            ...initialData,
            featuredImage: null
        }
    });

    console.log(initialData)

    const title = watch('title');
    React.useEffect(() => {
        if (title) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setValue('slug', generatedSlug);
        }
    }, [title, setValue]);

    const handleSubmission = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key !== 'featuredImage') {
                formData.append(key, data[key]);
            }
        });

        if (data.featuredImage?.[0]) {
            formData.append('blogImage', data.featuredImage[0]);
        }

        onSubmit(formData);
    };

    const currentImage = watch('featuredImage');

    return (
        <form onSubmit={handleSubmit(handleSubmission)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full"
                />
                {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    {...register('slug', { required: 'Slug is required' })}
                    className="w-full bg-gray-50"
                    readOnly
                />
                {errors.slug && (
                    <p className="text-sm text-red-500">{errors.slug.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (max 200 characters)</Label>
                <Textarea
                    id="excerpt"
                    {...register('excerpt', {
                        required: 'Excerpt is required',
                        maxLength: {
                            value: 200,
                            message: 'Excerpt cannot exceed 200 characters'
                        }
                    })}
                    className="w-full"
                />
                {errors.excerpt && (
                    <p className="text-sm text-red-500">{errors.excerpt.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <Input
                    id="featuredImage"
                    type="file"
                    {...register('featuredImage')}
                    accept="image/*"
                    className="w-full"
                />
                {initialData?.featuredImage && !currentImage?.[0] && (
                    <div className="mt-2">
                        <img
                            src={initialData?.featuredImage?.url || initialData.featuredImage}
                            alt="Current featured image"
                            className="h-20 w-20 object-cover rounded"
                        />
                    </div>
                )}
                {currentImage?.[0] && (
                    <div className="mt-2">
                        <img
                            src={URL.createObjectURL(currentImage[0])}
                            alt="Selected image preview"
                            className="h-20 w-20 object-cover rounded"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Controller
                    name="content"
                    control={control}
                    rules={{ required: 'Content is required' }}
                    render={({ field: { onChange, value } }) => (
                        <div>
                            <JoditEditor
                                value={value}
                                config={{
                                    readonly: false,
                                    height: 350,
                                    toolbarSticky: true,
                                    toolbarAdaptive: false,
                                    showCharsCounter: true,
                                    showWordsCounter: true,
                                    askBeforePasteHTML: false,
                                    askBeforePasteFromWord: false,
                                    defaultActionOnPaste: "insert_as_html",
                                    buttons: [
                                        "source", "|",
                                        "bold", "italic", "underline", "strike", "|",
                                        "ul", "ol", "indent", "outdent", "|",
                                        "font", "fontsize", "brush", "paragraph", "|",
                                        "image", "video", "table", "link", "file", "|",
                                        "align", "undo", "redo", "|",
                                        "hr", "fullsize", "print", "about", "copyformat", "|",
                                        "selectall", "cut", "copy", "paste",
                                    ],
                                    uploader: {
                                        insertImageAsBase64URI: true,
                                    },
                                    style: {
                                        margin: 0,
                                        padding: "5px 24px",
                                        backgroundColor: "#fff",
                                    },
                                }}
                                tabIndex={1}
                                onBlur={(newContent) => onChange(newContent)}
                            />
                            {errors.content && (
                                <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                    name="status"
                    control={control}
                    rules={{ required: 'Status is required' }}
                    render={({ field: { onChange, value } }) => (
                        <div>
                            <Select
                                value={value}
                                onValueChange={onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div className="flex items-center space-x-2">
                <Controller
                    name="isFeatured"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Switch
                            id="isFeatured"
                            checked={value}
                            onCheckedChange={onChange}
                        />
                    )}
                />
                <Label htmlFor="isFeatured">Featured Post</Label>
            </div>

            <div className="text-sm text-muted-foreground">
                Estimated reading time: {watch('content') ? Math.ceil(watch('content').replace(/<[^>]*>/g, '').split(/\s+/).length / 200) : 0} minute{watch('content') ? Math.ceil(watch('content').replace(/<[^>]*>/g, '').split(/\s+/).length / 200) !== 1 ? 's' : '' : ''}
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" className="w-full sm:w-auto">Submit</Button>
            </div>
        </form>
    );
};

export default BlogForm;

