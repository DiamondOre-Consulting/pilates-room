import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogs,
  deleteBlog,
  createBlog,
  editBlog,
} from "../Redux/Slices/blogSlice";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import BlogForm from "../components/BlogForm";
import { DataTable } from "../components/ui/data-table";
import { HomeLayout } from "@/Layout/HomeLayout";
import { Pencil, Plus } from "lucide-react";

const BlogManagement = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await dispatch(getAllBlogs({ page, limit }));
    setAllBlogs(res?.payload?.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, [dispatch, page, limit]);

  const handleCreateBlog = async (formData) => {
    const res = await dispatch(createBlog(formData));
    if (res?.payload?.success) {
      fetchBlogs();
      setIsCreateDialogOpen(false);
    }
  };

  const handleEditBlog = async (formData) => {
    const res = await dispatch(editBlog({ id: selectedBlog._id, formData }));
    if (res?.payload?.success) {
      fetchBlogs();
      setIsEditDialogOpen(false);
      setSelectedBlog(null);
    }
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`capitalize ${
            row?.original?.status === "published"
              ? "text-green-600"
              : row?.original?.status === "draft"
              ? "text-yellow-600"
              : "text-gray-600"
          }`}
        >
          {row?.status}
        </span>
      ),
    },
    {
      accessorKey: "isFeatured",
      header: "Featured",
      cell: ({ row }) => (
        <span className={row?.isFeatured ? "text-green-600" : "text-gray-600"}>
          {row?.isFeatured ? "Yes" : "No"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedBlog(row);
              setIsEditDialogOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteBlog(row?._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <HomeLayout>
      <div className="container mx-auto ">
        <div className="flex md:flex-row flex-col  justify-between md:gap-y-0 gap-y-2 mb-6">
          <h1 className="text-2xl font-semibold">Blog Management</h1>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                Create Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <BlogForm onSubmit={handleCreateBlog} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable
          columns={columns}
          data={allBlogs?.blogPosts}
          page={page}
          setPage={setPage}
          limit={limit}
        />

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {selectedBlog && (
                <BlogForm
                  onSubmit={handleEditBlog}
                  initialData={selectedBlog}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </HomeLayout>
  );
};

export default BlogManagement;
