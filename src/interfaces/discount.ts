interface Discount {
    id: number;
    title: string;
    description: string;
    discount_type: string;
    discount_percentage?: string | null;
    fixed_amount?: string | null;
    start_date: string;
    end_date: string;
    menu_item_id: string;
    usage_per_user: string;
    key_word_activation: string; // Ensure this is included
    status: string;
    images: string[];
    created_at: string;
    updated_at: string;
  }