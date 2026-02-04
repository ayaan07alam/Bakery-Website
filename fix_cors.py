import re
import os

# List of controller files to fix
controllers = [
    "CallbackRequestController.java",
    "CatalogueController.java",
    "CategoryController.java",
    "ContactController.java",
    "HeroSlideController.java",
    "MenuItemController.java",
    "NewsletterController.java",
    "OrderController.java",
    "ProductController.java",
    "SiteSettingsController.java",
    "VisitorSessionController.java"
]

base_path = r"d:\SahaBakery\backend\src\main\java\com\sahabakery\controller"

for controller in controllers:
    file_path = os.path.join(base_path, controller)
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove @CrossOrigin line (with optional comment)
        # Pattern matches @CrossOrigin(origins = "*") or @CrossOrigin(origins = "*") // comment
        pattern = r'@CrossOrigin\([^)]*\)(?:\s*//[^\n]*)?\n'
        new_content = re.sub(pattern, '', content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Fixed {controller}")
    except Exception as e:
        print(f"❌ Error fixing {controller}: {e}")

print("\n✅ All CORS annotations removed!")
